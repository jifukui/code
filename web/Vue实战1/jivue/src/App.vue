<template>
  <div id="app">
    <h1>Hello this is jifukui Vue test</h1>
    <div id="main">
      <div id="nav">
        <router-link to="/">根网页信息</router-link>
        <router-link to="/index">index界面</router-link>
        <router-link to="/jifukui">吉富逵的网页</router-link>
        <router-link to="/about">about网页</router-link>
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
h1 {
  text-align: center;
}

#nav {
  display: flex;
  width: 10%;
  flex-direction: column;
}
#nav a {
  color: brown;
  text-decoration-line: none;
  display: block;
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
.courent{
  margin: auto;
  height: 50%;
  width: 50%;
}
</style>
