<template>
  <div id="app">
    <h2>AdXOV設定用コードジェネレータ</h2>
    <div id="description">
      <a href="https://geniee.atlassian.net/wiki/spaces/jigyoukaihatuhonnbu/pages/756058053/GAM+AdX+GenieeSSP" target="_brank">Confluence記事</a><br>
      <span>GAM経由配信インラインバナーをオーバーレイとして配信させるための追記コードを生成するためのジェネレータ</span>
    </div>
    <myinputs></myinputs>
  </div>
</template>

<script>
import myinputs from "./components/inputs"
export default {
  components: {
    myinputs
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
