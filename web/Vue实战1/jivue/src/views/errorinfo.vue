<template>
    <div>
        <h1>您打开了一个错误的网页</h1>
        <sapn v-text="info"></sapn>
    </div>
</template>
<script>
export default {
    data(){
        return{
            info:this.$store.state.errorinfo
        }
    }
}
</script>