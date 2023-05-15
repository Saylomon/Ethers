<template>
    <div>
        <block 
            v-for:='block in $store.state.blocks'
            :block="block"
        />
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: "HomePage",
    methods: {
        ...mapActions({
            newBlockHeaders: "newBlockHeaders"
        })
    },
    async mounted() {
        this.newBlockHeaders()
    },
}
</script>


<style>
    .info{
        border: 2px solid purple;
        padding: 1px 3px;
    }
</style>