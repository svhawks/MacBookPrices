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
#table2 {
  border: 1px solid rgba(0, 40, 100, 0.12);
  margin: auto;
  background-color: white;
  display: table;
  width: 100% !important;
}

.t-row {
  text-align: -webkit-match-parent;
}

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

.inputs {
  padding: 3em;
  margin: auto;
  width: 67%;
}

thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
  cursor: pointer;
}
p {
  text-align: center;
}
.sorting:after { 
  content: "\e92d";
  font-family: 'feather' !important;
  
}

.sorting:before {
  content: "\e930";
  font-family: 'feather' !important;
}
.thead-light {
  color: #495057;
  background-color: #e9ecef;
  border-color: rgba(0, 40, 100, 0.12);
}

.unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.homeTitle {
  font-family: monospace;
  font-style: oblique;
  font-stretch: extra-expanded;
  font-size: 2.5em;
  text-align: center;
  color: cornflowerblue;
  padding-top: 0.5em;
}
.table {
  width: 68% !important;  
  margin: auto;
  margin-top: 3em;
}
</style>
