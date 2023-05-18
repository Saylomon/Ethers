<template>
    <div class="block">
        <div class="block_info">Номер блока: {{ block.number }}</div><br>
        <div class="block_info">Хэш блока: {{ block.hash }}</div><br>
        <div class="block_info">Газа использовано: {{ block.gasUsed }}</div><br>
        <div class="block_info">Базовая стоимость за газ: {{ block.baseFeePerGas }}</div><br>
        <div>
            <div class="block_info">Список транзакции: </div><br>
            <router-link
                v-for:="hash in block.transactions" 
                :to="`/transaction/${hash}`"> 
                <div class="block_info"> {{ hash }} </div> 
            </router-link>
        </div>
    </div>
</template>


<script>
import { mapActions } from 'vuex'
export default{
    name: "block-item",
    data(){
        return{
            block: {}
        }
    },
    props:{
        blockNumberOrHash:{
            type: String,
            required: true
        }
    },
    methods: {
        ...mapActions({
            getBlock: "getBlock"
        })
    },
    async mounted(){
        this.block = await this.getBlock(this.blockNumberOrHash)
        console.log(this.blockNumberOrHash)
    },
    watch:{
        async blockNumberOrHash(){
            this.block = await this.getBlock(this.blockNumberOrHash)
        }
    }
}
</script>


<style scoped>
.block{
    border: 2px solid purple;
    margin: 5px;
    padding: 10px; 
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.block_info{
    border: 2px solid purple;
    margin: 5px;
    padding: 10px; 
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>