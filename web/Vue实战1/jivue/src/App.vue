<template>
  <div id="app">
    <h1>Hello this is jifukui Vue test</h1>
    <div id="main">
      <div id="nav">
        <router-link to="/">Vuex的实验</router-link>
        <router-link to="/router">Vue-Router实验</router-link>
        <router-link to="/vue">Vue的使用</router-link>
        <router-link to="/elementui">ElementUI的使用</router-link>
        <router-link to="/three">ThreeJs的使用</router-link>
        <router-link to="/heightchart">HeightChart的使用</router-link>
        <router-link to="/echart">echart的使用</router-link>
        <router-link to="/axios">axios的使用</router-link>
        <router-link to="/index">index界面</router-link>
        <router-link to="/jifukui">吉富逵的网页</router-link>
        <router-link to="/errorinfo">about网页</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
* {
  background-color: lightgoldenrodyellow;
  margin: 0;
}
button > span,
button > i {
  background-color: rgba(0, 0, 0, 0);
}
h1 {
  text-align: center;
}

#nav {
  display: flex;
  width: 8%;
  flex-direction: column;
}
#nav a {
  color: brown;
  text-decoration-line: none;
  display: block;
  border: 3px solid aquamarine;
  margin: 2px;
}
#nav a:focus {
  background: lawngreen;
}
#nav a:hover {
  background: ivory;
}
#main {
  display: flex;
}
.courent {
  margin: auto;
  height: 100%;
  width: 70%;
}
h1,
h2,
h3,
h4 {
  text-align: center;
}
</style>
