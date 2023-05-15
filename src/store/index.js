import { createStore } from 'vuex'
const ethers = require('ethers')
let provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/8H_rc42Uvn9GWrvP5qDSYZumgfFOGfdC')

const Web3 = require('web3')
const web3 = new Web3('wss://eth-goerli.g.alchemy.com/v2/8H_rc42Uvn9GWrvP5qDSYZumgfFOGfdC')

export default createStore({
  state: {
    blocks: []
  },
  getters: {

  },
  mutations: {
    setBlock(state, newBlock){
      state.blocks.unshift(newBlock) 
    }
  },
  actions: {
    async newBlockHeaders({commit}){
      provider.on("block", async blockNumber => {
        let block = await provider.getBlock(blockNumber)
        let newBlock = {
          number: block.number,
          hash: block.hash
        }
        commit("setBlock", newBlock)
      })
    },
    async getBlock({commit}, blockNumberOrHash){
      if(! ethers.utils.isBytesLike(blockNumberOrHash)){
        blockNumberOrHash = Number(blockNumberOrHash)
      }
      console.log(await provider.getBlock(blockNumberOrHash))
      return await provider.getBlock(blockNumberOrHash)
    },
    async getTransaction({commit}, txHash){
      return await provider.getTransaction(txHash)
    }
  },
  modules: {

  }
})