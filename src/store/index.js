import { createStore } from 'vuex'
const ethers = require('ethers')
const Provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/8H_rc42Uvn9GWrvP5qDSYZumgfFOGfdC')

const Web3 = require('web3')
const web3 = new Web3('wss://eth-goerli.g.alchemy.com/v2/8H_rc42Uvn9GWrvP5qDSYZumgfFOGfdC')
import { ABI } from '@/contracts/Example.abi.js'
import { bytecode } from '@/contracts/Example.bin.js'

export default createStore({
  state: {
    // blocks: []
    provider: {},
    wallet: {
      address: "",
      chain: "",
      chainId: ""
    },
    estemateGas: "",
    txHash: ""
  },
  getters: {

  },
  mutations: {
    // setBlock(state, newBlock) {
    //   state.blocks.unshift(newBlock)
    // }
  },
  actions: {
    // async newBlockHeaders({ commit }) {
    //   let subscribe = web3.eth.subscribe("newBlockHeaders")
    //     .on("data", block => {
    //       let newBlock = {
    //         number: block.number,
    //         hash: block.hash
    //       }
    //       commit("setBlock", newBlock)
    //     })
    // },
    async getBlock({ commit }, blockNumberOrHash) {
      if (! await ethers.utils.isBytesLike(blockNumberOrHash)) {
        blockNumberOrHash = Number(blockNumberOrHash)
      }
      return await Provider.getBlock(blockNumberOrHash)
    },
    async getTransaction({ commit }, txHash) {
      console.log(await Provider.getTransaction(txHash))
      return await Provider.getTransaction(txHash)
    },
    async connectWallet({ state }) {
      if (typeof window.ethereum !== 'undefined') {
        console.log("Ethereum client installed!")
        if (ethereum.isMetaMask === true) {
          console.log("Metamask installed!")
          if (ethereum.isConnected() !== true) {
            console.log("Metamask is not connected!")
            await ethereum.enable()
          }
          console.log("Metamask connected!")
        }
        else {
          alert("Metamask is not installed!")
        }
      }
      else {
        alert("Ethereum client is not installed!")
      }

      ethereum.request({ method: "eth_requestAccounts" })
        .then(accounts => {
          state.wallet.address = accounts[0]
          console.log(`Account ${state.wallet.address} connected`)
        })

      state.provider = new ethers.providers.Web3Provider(ethereum)
      let network = await Provider.getNetwork()
      state.wallet.chain = network.name
      state.wallet.chainId = network.chainId

      ethereum.on('accountsChanged', async (accounts) => {
        state.wallet.address = accounts[0]
        console.log(`Account ${state.wallet.address} connected`)
      })


      ethereum.on('chainChanged', async (accounts) => {
        state.provider = new ethers.providers.Web3Provider(ethereum)
        let network = await state.provider.getNetwork()
        state.wallet.chain = network.name
        state.wallet.chainId = network.chainId
      })
    },



    async estimateGasForTx({ state }, [to, value]) {
      value =  ethers.BigNumber.from(value)
      value = value.toHexString()
      state.estemateGas = await Provider.estimateGas({
        to: to,
        value: value
      })
    },



    async sendTransaction({ state }, [to, value]) {

      console.log(to, value)
      value =  ethers.BigNumber.from(value)
      console.log(value)
      console.log(state.estemateGas)
      value = value.toHexString()
      state.estemateGas =  ethers.BigNumber.from(state.estemateGas)
      state.estemateGas = (state.estemateGas).toHexString()

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: state.wallet.address,
          to: to,
          gas: state.estemateGas,
          value: value
          // state.provider.utils.numberToHex(state.estimateGas)
        }]
      }).then(hash => {
        console.log(`Tx Hash: ${hash}`)
      })
    },



    async deployContract({ state }) {

      let myContract = new state.provider.eth.Contract(ABI)

      let deployCode = myContract.deploy({
        data: bytecode
      }).encodeABI()
      await ethereum.request({

        method: "eth_sendTransaction",

        params: [{
          from: state.wallet.address,
          data: deployCode
        }]
      })
        .then(hash => {
          console.log(`TX hash ${hash}`)
        })
    },



    async setNumber({ state }, [contractAddress, number]) {

      let iFace = new ethers.utils.Interface(ABI)

      let txData = iFace.encodeFunctionData("setNumber", [number])

      state.txHash = ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: state.wallet.address,
          to: contractAddress,
          data: txData
        }]
      })
      console.log("TX hash Huuinya:" + await state.txHash)
      return await state.txHash
    },

    async setStr({state}, [contractAddress, string]){

      let iFace = new ethers.utils.Interface(ABI)

      let txData = iFace.encodeFunctionData("setStr", [string])

      
      state.txHash = ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: state.wallet.address,
          to: contractAddress,
          data: txData
        }]
      })
      console.log("TX hash Huuinya:" + await state.txHash)
      return await state.txHash

    },

    async addArray({state}, [contractAddress, uint256]){
      let iFace = new ethers.utils.Interface(ABI)

      let txData = iFace.encodeFunctionData("addArray", [uint256])

      state.txHash = ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: state.wallet.address,
          to: contractAddress,
          data: txData
        }]
      })
      console.log("TX hash Huuinya:" + await state.txHash)
      return await state.txHash
    },

    async getNumber({ state }, contractAddress) {

      let myContract = new ethers.Contract(contractAddress, ABI, Provider)

      let number = await myContract.number()
      return number
    },

    async getStr({state}, contractAddress){

      let myContract = new ethers.Contract(contractAddress, ABI, Provider)
      let string = await myContract.str()

      return string
    },

    async getArr({state}, contractAddress){
      let length = parseInt(await Provider.getStorageAt(contractAddress, 2))
      console.log(length)
      let myContract = new ethers.Contract(contractAddress, ABI, Provider)
      let arr = []
      for(let i = 0; i < length; i++){
        arr.push(parseInt(await myContract.array(i)))
      }
      console.log(arr)
      return arr
    },


    async getStatus({ state }, hash) {
      console.log(hash)
      state.provider = new Web3(ethereum)
      console.log(state.provider)

      let res = await Provider.getTransactionReceipt(hash)
      let status = res.status
      if(status == 1){
        status = "Success"
      }
      else {
        status = "Fail"
      }

      return status
    },

    async getGasUsed({state}, hash){
      let res = await Provider.getTransactionReceipt(hash)
      let gasUsed = (res.gasUsed).toNumber()
      return gasUsed
    }
  },
  modules: {

  }
})
