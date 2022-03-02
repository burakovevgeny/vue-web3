import Web3 from 'web3'

declare global {
  interface Window {
    ethereum?: any;
  }
}

let web3Wallet: any

export const connectToWallet = async (): Promise<any> => {
  try {
    const { ethereum } = window
    if (!ethereum) {
      return Error
    }
    web3Wallet = new Web3(ethereum)
    await ethereum.enable()
  } catch (e) {
    return e
  }
}
