<template>
    <div class="courent">
        <div v-text="count"></div>
        <input type="button" v-bind:value="buttoninfo" @click="incream" />
        <div v-text="countlimit"></div>
    </div>
</template>

<script>
export default {
    name: 'vuex' ,
    data() {
        return {
            count: this.$store.state.count,
            buttoninfo: "点击我",
            countlimit:false
        }
    },
    methods: {
        incream : function() {
            console.log("hello this is jifukui");
            this.$store.commit("incream");
            this.count=this.$store.state.count;
            this.countlimit=this.$store.getters.countend;
        }
    }
}
</script>

<style scoped>

</style>
