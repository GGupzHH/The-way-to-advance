<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'app',
}
</script>
<style>
html,
body {
  background-color: #edf2f6;
}
html,
body,
p {
  margin: unset;
  padding: unset;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Microsoft Yahei",
    "微软雅黑", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
