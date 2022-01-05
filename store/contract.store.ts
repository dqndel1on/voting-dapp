import VotingDapp from '../artifacts/contracts/_VotingDapp.sol/VotingDapp.json';
import create from 'zustand'
import { ethers } from 'ethers';

declare let window: any;
type DataTypes = {
    id: number;
    date: string;
    VotingDappItem: string;
}
type VotingDappTypes = {
    contractAddress: string;
    totalVotes: number,
    totalCandidates: number,
    electionStarted: boolean,
    manager: string,
    winner: string,
    getInitialData: () => void,
    candidates: { candidateName: string, candidateAge: number }[],
    getCandidates: (_index: number) => void;
    becomeCandidate: (_name: string, _age: number) => void,
    createTask: (data: DataTypes) => void;
    tasks: DataTypes[];
    getTasks: (id: number) => void;
    totalItemsInList: number;
    getTotalItemsInList: () => void;
    sendComplete: (index: number) => void
}

const useVotingDapp = create<VotingDappTypes>((set, get) => ({
    totalVotes: 0,
    totalCandidates: 0,
    electionStarted: false,
    manager: '',
    winner: '',
    contractAddress: '0xEBeE87b4DC64905E89F7Dc63645b7a3B9186beE8',
    candidates: [],
    getCandidates: async (_index: number) => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(get().contractAddress, VotingDapp.abi, provider)
            try {
                const data = await contract.get(_index)
                set(prev => ({ candidates: [...prev.candidates, data] }))
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    becomeCandidate: async (_name, _age) => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(get().contractAddress, VotingDapp.abi, provider)
            try {
                const transaction = await contract.becomeCandidate(_name, _age)
                await transaction.wait()
                get().getInitialData();
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    tasks: [],
    totalItemsInList: 0,
    createTask: async (data: DataTypes) => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(get().contractAddress, VotingDapp.abi, signer)
            const transaction = await contract.create(data.VotingDappItem, data.id, data.date)
            await transaction.wait()
            set({ tasks: [], totalItemsInList: get().totalItemsInList + 1 })
        }
    },
    getTasks: async (id) => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(get().contractAddress, VotingDapp.abi, provider)
            try {
                const data = await contract.get(id)
                set(prev => ({ tasks: [...prev.tasks, data] }))
            } catch (err) {
                throw new Error("Could not get data.")
            }
        }
    },
    getTotalItemsInList: async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(get().contractAddress, VotingDapp.abi, provider)
            try {
                const data = await contract.totalItemsInList()
                set({ totalItemsInList: data.toNumber() })
            } catch (err) {
                throw new Error("Could not get data.")
            }
        }
    },
    sendComplete: async (index) => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(get().contractAddress, VotingDapp.abi, signer)
            try {
                const transaction = await contract.toggleCompleted(index)
                await transaction.wait()
                set({ tasks: [], totalItemsInList: get().totalItemsInList - 1 })
            } catch (err) {
                throw new Error("Could not update data.")
            }
        }
    },
    getInitialData: async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(get().contractAddress, VotingDapp.abi, provider)
            try {
                const totalVotes = await contract.totalVotes();
                const totalCandidates = await contract.totalCandidates();
                const electionStarted = await contract.electionStarted();
                const manager = await contract.manager();
                const winner = await contract.winner();
                set({ totalVotes: totalVotes.toNumber(), totalCandidates: totalCandidates.toNumber(), electionStarted, manager, winner });
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}))

export default useVotingDapp;