import VotingDapp from '../artifacts/contracts/_VotingDapp.sol/VotingDapp.json';
import create from 'zustand'
import { ethers } from 'ethers';

declare let window: any;
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
    becomeCandidate: (data: { _name: string, _age: number }) => void,
    vote: (_index: number) => void,
    startElection: () => void,
    endElection: () => void,
    getResult: () => void
}

const useVotingDapp = create<VotingDappTypes>((set, get) => ({
    totalVotes: 0,
    totalCandidates: 0,
    electionStarted: false,
    manager: '',
    winner: '',
    contractAddress: '0xf763B266dDa6df79594D81F9b93a234d8D3b6eac',
    candidates: [],
    getCandidates: async (_index: number) => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(get().contractAddress, VotingDapp.abi, provider)
            try {
                const data = await contract.getCandidate(_index)
                set(prev => ({ candidates: [...prev.candidates, data] }))
            } catch (err) {
                console.log(err.message)
            }
        }
    },
    becomeCandidate: async (data) => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(get().contractAddress, VotingDapp.abi, signer)
            try {
                const transaction = await contract.becomeCandidate(data._name, data._age)
                await transaction.wait()
                set({ totalCandidates: get().totalCandidates + 1 })
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    vote: async (_index: number) => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(get().contractAddress, VotingDapp.abi, signer)
            try {
                console.log(_index)
                const transaction = await contract.vote(_index)
                await transaction.wait()
            } catch (err) {
                throw new Error(err.message)
            }
        }
    },
    startElection: async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(get().contractAddress, VotingDapp.abi, signer)
            try {
                const transaction = await contract.startElection()
                await transaction.wait()
                get().getInitialData();
            } catch (err) {
                throw new Error(err.message)
            }
        }
    },
    endElection: async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(get().contractAddress, VotingDapp.abi, signer)
            try {
                const transaction = await contract.endElection()
                await transaction.wait()
                get().getInitialData();
                set({ candidates: [] })

            } catch (err) {
                throw new Error(err.message)
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
                throw new Error(err.message)
            }
        }
    },
    getResult: async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(get().contractAddress, VotingDapp.abi, signer)
            try {
                const winner = await contract.winnerName();
                await winner.wait()
                get().getInitialData()
            } catch (err) {
                throw new Error(err.message)
            }
        }
    }
}))

export default useVotingDapp;