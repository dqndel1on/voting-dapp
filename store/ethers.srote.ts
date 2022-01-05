import { ethers } from 'ethers';
import create from 'zustand'

declare let window: any;

type EthersType = {
    accounts: string[],
    contractAddress: string,
    setAccounts: (data) => void,
    requestAccounts: () => void,
    checkMMConnection: () => void
}

const useEthers = create<EthersType>((set, get) => ({
    contractAddress: '0xEBeE87b4DC64905E89F7Dc63645b7a3B9186beE8',
    accounts: [''],
    setAccounts: (data) => set({ accounts: data }),
    requestAccounts: async () => {
        const Accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        set({ accounts: Accounts })
    },
    checkMMConnection: async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        if (provider) {
            const accounts = await provider.listAccounts();
            if (accounts.length !== 0) {
                void get().requestAccounts();
            } else {
                set({ accounts })
            }

        }
    }
}))

export default useEthers;