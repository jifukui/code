<template>
  <div class="courent">
    <div>
      <router-link to="/router/info">去往个人信息界面</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "route"
};
</script>
