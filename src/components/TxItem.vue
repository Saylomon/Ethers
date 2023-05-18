<template>
    <div class="tx">
        <div>
            <div class="tx_info">Block Number: <router-link :to="`/block/${transaction.blockNumber}`"> {{transaction.blockNumber}} </router-link> </div>
        </div>
        <div class="tx_info">TX Hash: {{ transaction.hash }}</div>
        <div class="tx_info">From: {{ transaction.from }}</div>
        <div class="tx_info">To: {{ transaction.to }}</div>
        <div class="tx_info">Value: {{ transaction.value }}</div>
        <div class="tx_info">Gas Price: {{ transaction.gasPrice }}</div>
        <div class="tx_info">Gas Used: {{ GasUsed }}</div>
        <div class="tx_info">TX Status: {{ txStatus }}</div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'tx-item',
    data(){
        return{
            transaction: {},
            txStatus: "",
            GasUsed: ""
        }
    },
    props:{
        txHash:{
            type: String,
            required: true
        }
    },
    methods: {
        ...mapActions({
            getTransaction: "getTransaction",
            getStatus: "getStatus",
            getGasUsed: "getGasUsed"
        })
    },
    async gGas(){
        this.GasUsed = await this.getGasUsed(this.txHash)
    },
    async mounted() {
        this.transaction = await this.getTransaction(this.txHash)
        this.txStatus = await this.getStatus(this.transaction.hash)
        this.GasUsed = await this.getGasUsed(this.txHash)
    },
    watch:{
        async txHash(){
            this.transaction = await this.getTransaction(this.txHash)
        },
        async txStatus(){
            this.txStatus = await this.getStatus()
        },
        async GasUsed(){
            this.GasUsed = await this.getGasUsed()
        }
    }
}
</script>


<style scoped>
.tx{
    border: 2px solid purple;
    margin: 5px;
    padding: 10px; 
    font-family: 'Times New Roman', Times, serif;
}
.tx_info{
    border: 2px solid purple;
    margin: 5px;
    padding: 10px; 
    font-family: 'Times New Roman', Times, serif;
}
</style>