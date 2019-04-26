<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import "../static/css/dashboard.css";

.leftbar {
  left: 0;
  margin: 1%;
  position: fixed;
  z-index: 999;
  width: 13%;
}
.clear {
  position: absolute;
  right: 0.9em;
  margin-top: 0.5em;
}

.unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
