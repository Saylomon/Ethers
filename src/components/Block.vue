<template>
    <div class="block">
       Номер блока: {{block.number}}<br>
       Хэш блока: {{block.hash}}
       <button @click="$router.push(`/block/${block.number}`)">Открыть страницу блока</button>
    </div>
</template>

<script>
export default {
    name: "block",
    data(){
        return{
            block: {}
        }
    },
    props:{
        block:{
            type: Object,
            required: true
        }
    }
}
</script>


<style scoped>
.block{
    border: 2px solid purple;
    margin: 5px;
    display: flex;
    padding: 10px; 
    font-family:'Times New Roman', Times, serif;
}
button{
    border: 2px solid purple;
    align-self: flex-end;
    margin-left: auto;
    color: purple;
    padding: 7px;
}

</style>