// @ts-nocheck
import Web3 from 'web3'
import { BigNumber } from 'bignumber.js'
import { ERC20 } from '~/abi/abis'

BigNumber.config({ EXPONENTIAL_AT: 60 })
let web3Wallet
let web3Guest

const tokens = [process.env.CFI_TOKEN, process.env.USDT_TOKEN, process.env.DLD_TOKEN]

export const shiftedBy = (value: string | number, decimals: string | number, mode?: number | 0): string => {
  const decimalsInt = mode === 0 ? parseInt(decimals) : -parseInt(decimals)
  return new BigNumber(value).shiftedBy(decimalsInt).toString()
}

export const fetchContractData = async (method: string, abi: Array<any>, address: string, params?: Array<any>) => {
  try {
    const contract = new web3Guest.eth.Contract(abi, address)
    return await contract.methods[method](...params).call()
  } catch (e) {
    console.log(e)
    return Error
  }
}

export const sendTransaction = async (method: string, abi: any[], address: string, params?: string[]): Promise<any> => {
  const userAddress = await web3Wallet.eth.getCoinbase()
  const inst = new web3Wallet.eth.Contract(abi, address)
  return inst.methods[method](...params).send({
    to: address,
    from: userAddress
  })
}

export const initTokens = async () => {
  try {
    return await Promise.all(tokens.map(async (token) => {
      const decimal = await fetchContractData('decimals', ERC20, token, [])
      const symbol = await fetchContractData('symbol', ERC20, token, [])
      return (
        {
          decimal,
          symbol,
          address: token
        }
      )
    }))
  } catch (e) {
    console.log(e)
  }
}

export const initBalance = async () => {
  const userAddress = await web3Wallet.eth.getCoinbase()
  const result = await Promise.all(tokens.map(async (token) => {
    const balance = await fetchContractData('balanceOf', ERC20, token, [userAddress])
    return ({
      [token]: {
        balance
      }
    })
  }))
  return result.reduce((acc, rec) => {
    return { ...acc, ...rec }
  }, {})
}

export const getAllowance = async (from, to, contract) => {
  return await fetchContractData('allowance', ERC20, contract, [from, to])
}

export const approve = async (to, amount, contract) => {
  return await sendTransaction('approve', ERC20, contract, [to, amount])
}

export const transfer = async (from, to, amount, contract) => {
  return await sendTransaction('transferFrom', ERC20, contract, [from, to, amount])
}

export const getUserAddress = async (): Promise<string> => {
  return await web3Wallet.eth.getCoinbase()
}

export const getTransaction = async (address: string): Promise<any> => {
  const contract = new web3Wallet.eth.Contract(ERC20, address)
  const userAddress = await getUserAddress()
  const transfers = await contract.getPastEvents('Transfer', {
    filter: { from: userAddress },
    fromBlock: 0,
    toBlock: 'latest'
  })
  const approvals = await contract.getPastEvents('Approval', {
    filter: { spender: userAddress },
    fromBlock: 0,
    toBlock: 'latest'
  })
  return [...transfers, ...approvals].map((transaction) => {
    return {
      type: transaction.event,
      from: transaction.returnValues[0],
      to: transaction.returnValues[1],
      amount: transaction.returnValues[2]
    }
  })
}

export const connectNode = () => {
  try {
    const bscUrl = process.env.WSS_RINKEBY
    const provider = new Web3.providers.WebsocketProvider(bscUrl)
    web3Guest = new Web3(provider)
  } catch (e) {
    return Error
  }
}

export const connectToWallet = async () => {
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
