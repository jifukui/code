<template>
    <p v-text="info"></p>
</template>

<script>
export default {
    data() {
        return{
            info:"Hello，大家好我是吉富逵，你当前看见的是我的一个Vue的实验程序"
        }
    }
}
</script>
<style  scoped>
    p{
        font-size: 2em;
    }
</style>