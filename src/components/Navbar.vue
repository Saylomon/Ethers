<template>
    <div>
        <div>
            <button @click="$router.push('/')">Главная страница</button>
        </div>
        <div>
            <input v-model="blockNumberOrHash" placeholder="Введите номер блока или хэш" type="text">
            <button @click="$router.push(`/block/${this.blockNumberOrHash}`)">Open</button>
        </div>
        <div>
            <input v-model="txHash" placeholder="Введите хэш транзакции" type="text">
            <button @click="$router.push(`/transaction/${this.txHash}`)">Open</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "navbar",
    data(){
        return{
            blockNumberOrHash: "",
            txHash: "",
        }
    }
}
</script>


<style scoped>
button{
    padding: 7px;
    margin: 5px;
    margin-top: 2px;
    border: 2px solid purple;
    margin-bottom: 1px;
    color: purple;
}
input{
    border: 2px solid purple;
    margin: 5px;
    padding: 7px;
}
</style>