<template>
<div>
  <div class="row">
    <div class="col"></div>
    <div class="col-4">
      <p class="title" v-if="mac != undefined">{{mac.name}}</p>
    </div>
    <div class="col"></div>
  </div>
  <div class="row">
    <div class="col"></div>
  <div class="Mytable col-4" v-if="mac != undefined">
    <div class="card">
    <t-table class="table">
      <table-row class="t-row">
        <table-cel class="score" colspan="1" header>Single-Core Score</table-cel>
        <table-cel class="score" colspan="1" header>{{mac.single_score}}</table-cel> 
      </table-row>
      <table-row class="t-row">
        <table-cel class="score" colspan="1" header>Multi-Core Score</table-cel>
        <table-cel class="score" colspan="1" header>{{mac.multi_score}}</table-cel> 
      </table-row>
      <table-row class="t-row">
        <table-cel class="score" colspan="1" header>Model Identifier</table-cel>
        <table-cel class="score" colspan="1" header>{{mac.model_identifier}}</table-cel> 
      </table-row>
      <table-row class="t-row">
        <table-cel class="score" colspan="1" header>Processor</table-cel>
        <table-cel class="score" colspan="1" header>{{mac.processor}}</table-cel> 
      </table-row>
      <table-row class="t-row">
        <table-cel class="score" colspan="1" header>Processor Frequency</table-cel>
        <table-cel class="score" colspan="1" header>{{mac.multi_score}}</table-cel> 
      </table-row>
      <table-row class="t-row">
        <table-cel class="score" colspan="1" header>Processors</table-cel>
        <table-cel class="score" colspan="1" header>{{mac.processor_count}}</table-cel> 
      </table-row>
      <table-row class="t-row">
        <table-cel class="score" colspan="1" header>Processor Cores</table-cel>
        <table-cel class="score" colspan="1" header>{{mac.processor_cores}}</table-cel> 
      </table-row>
      <table-row class="t-row">
        <table-cel class="score" colspan="1" header>Processor Threads</table-cel>
        <table-cel class="score" colspan="1" header>{{mac.processor_threads}}</table-cel> 
      </table-row>
      <table-row class="t-row">
        <table-cel class="score" colspan="1" header>Price</table-cel>
        <table-cel class="score" colspan="1" header>${{mac.price}}</table-cel> 
      </table-row>
      <table-row class="t-row">
        <table-cel class="score" colspan="1" header>Multi-score per $</table-cel>
        <table-cel class="score" colspan="1" header>{{(mac.multi_score/(mac.price) == 0 ? 1 : mac.price ).toFixed(2)}}</table-cel> 
      </table-row>
    </t-table>
    </div>
  </div>
    
    <div class="col">
    </div>
  </div>
  <div class="row">
    <div class="col"></div>
    <div class="col-4">
      <p class="back" ><a @click="homeLink">Back to Home</a></p>
    </div>
    <div class="col"></div>
  </div>
  
</div>
</template>

<script>
import  { Table, TableBody, TableCel, TableHead, TableRow } from './index.js'
import axios from 'axios'
export default {
  name: 'MacProfile',
  data () {
    return {
      mac: null
    }
  },
  created () {
    axios.get('https://batin.github.io/MacScoresDB/db.json')
      .then(macs => {
        macs.data.macs.forEach(mac => {
            if(mac._id== this.$route.params.id){
            this.mac = mac
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    homeLink () {
      this.$router.push({name: 'home'})
    }
  }
}
</script>
<style>
.score {
  border: 1px solid;
}
.title {
  font-family:monospace;
  font-style: oblique;
  font-stretch:extra-expanded;
  font-size: 2.5em;
  color:  cornflowerblue;
  text-align: center;
  }
.t-row {
  border: 2px ridge ;
}
.table {
  width: 100%;
  margin: auto;
}

  .back {
  font-family:monospace;
  font-style: oblique;
  font-stretch:extra-expanded;
  font-size: 2em;
  color:  cornflowerblue;
  text-align: center;
  cursor: pointer;
  }
</style>
