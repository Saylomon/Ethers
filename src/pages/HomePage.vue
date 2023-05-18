<template>
    <div>
        <block 
            v-for:='block in $store.state.blocks'
            :block="block"
        />
        <div class="block_info">
            <div> Адрес аккаунта: {{ $store.state.wallet.address }} </div>
            <div> Сеть аккаунта: {{ $store.state.wallet.chain }} </div>
            <div> ID аккаунта: {{ $store.state.wallet.chainId }} </div>
            <button @click="connectWallet"> Подключить Metamask </button>
        </div>

        <div>
            <div class="block_info">
                <p class="title"> Отправка эфира на аккаунт </p>
            <input v-model="to" placeholder="Введите адрес получателя" type="text">
            <input v-model="value" placeholder="Введите сумму" type="text">
            <button @click="send"> Отправить </button>
            <button @click="esGas"> estimateGas </button>
            </div>
        </div>

        <div>
            <button class="block_info" @click="deploy"> Задеплоить контракт </button>
        </div>

        <div class="block_info">
            <p class="title"> setNumber </p>
            <input v-model="cAddress" placeholder="Введите адрес контракта" type="text">
            <input v-model="number" placeholder="Введите число" type="text">
            <button @click="sNumber"> Отправить </button>
             <!-- <button @click="esGas"> estimateGas </button> -->
            <p class="title"> TX Hash: <router-link :to="`/transaction/${setNumberHash}`"> {{ setNumberHash }} </router-link> </p>
        </div>

        <div class="block_info">
            <p class="title"> setStr </p>
            <input v-model="cAddress" placeholder="Введите адрес контракта" type="text">
            <input v-model="string" placeholder="Введите строку" type="text">
            <button @click="sStr"> Отправить </button>
             <!-- <button @click="esGas"> estimateGas </button> -->
            <p class="title"> TX Hash: <router-link :to="`/transaction/${setStrHash}`"> {{ setStrHash }} </router-link> </p>
        </div>

        <div class="block_info">
            <p class="title"> addArray </p>
            <input v-model="cAddress" placeholder="Введите адрес контракта" type="text">
            <input v-model="uint256" placeholder="Введите число" type="text">
            <button @click="addArr"> Отправить </button>
             <!-- <button @click="esGas"> estimateGas </button> -->
            <p class="title"> TX Hash: <router-link :to="`/transaction/${addArrHash}`"> {{ addArrHash }} </router-link> </p>
        </div>

        <div class="block_info">
            <p class="title"> Number </p>
            <div><input v-model="contractAddress" placeholder="Введите адрес контракта" type="text"></div>
            <button @click="gNumber"> Получить число</button>
            <p class="title"> Полученное число = {{returnValue}} </p>
        </div>

        <div class="block_info">
            <p class="title"> String </p>
            <div><input v-model="contractAddress" placeholder="Введите адрес контракта" type="text"></div>
            <button @click="gStr"> Получить строку</button>
            <p class="title"> Полученная строка = {{returnString}} </p>
        </div>

        <div class="block_info">
            <p class="title"> Array </p>
            <div><input v-model="contractAddress" placeholder="Введите адрес контракта" type="text"></div>
            <button @click="gArr"> Получить массив</button>
            <p class="title"> Полученный массив = {{returnData}} </p>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: "HomePage",
    data(){
        return{
            to: "",
            value: "",
            cAddress: "",
            number: "",
            returnValue: "",
            setNumberHash: "",
            contractAddress: "",
            string: "",
            setStrHash: "",
            returnString: "",
            uint256: "",
            returnData: "",
            addArrHash: ""
        }
    },
    methods: {
        ...mapActions({
            newBlockHeaders: "newBlockHeaders",
            connectWallet: "connectWallet",
            estimateGasForTx: "estimateGasForTx",
            sendTransaction: "sendTransaction",
            deployContract: "deployContract",
            setNumber: "setNumber",
            getNumber: "getNumber", 
            setStr: "setStr",
            getStr: "getStr",
            addArray: "addArray",
            getArr: "getArr"
        }),
        async addArr(){
            this.addArrHash = await this.addArray([this.cAddress, this.uint256])
        },
        async gArr(){
            this.returnData = await this.getArr(this.contractAddress)
        },
        async sStr(){
            this.setStrHash = await this.setStr([this.cAddress,this.string])
        },
        async gStr(){
            this.returnString = await this.getStr(this.contractAddress)
        },
        async esGas(){
            await this.estimateGasForTx([this.to,this.value])
        },
        async send(){
           await this.sendTransaction([this.to,this.value])
           this.to = ""
           this.value = ""
        },
        async deploy(){
            await this.deployContract()
        },
        async sNumber(){
            this.setNumberHash = await this.setNumber([this.cAddress,this.number])
        },
        async gNumber(){
            this.returnValue = await this.getNumber(this.contractAddress)
        },
    },
    // async mounted() {
    //     this.newBlockHeaders()
    // },
}
</script>


<style>
.info{
    border: 2px solid purple;
    padding: 1px 3px;
}
button{
    padding: 7px;
    margin: 5px;
    margin-top: 2px;
    border: 2px solid purple;
    margin-bottom: 10px;
    color: purple;
}
.block_info{
    border: 7px solid rgb(124, 6, 110);
    margin: 50px;
    padding: 10px; 
    font-family: 'Times New Roman', Times, serif;
    margin-top: 35px;
}
input{
    border: 2px solid purple;
    margin: 5px;
    padding: 7px;
}
.title{
    margin: 5px;
    padding: 5px 5px;
    border: 2px solid purple;
    font-family: Arial, Helvetica, sans-serif;
    /* font-size: auto; */
    display: flex;
    justify-content: center;
    width: auto;
    height: auto;
    align-self: center;
    text-align: center;
}
</style>