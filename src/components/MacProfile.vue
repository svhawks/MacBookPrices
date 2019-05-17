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
  <div class="Mytable" v-if="mac != undefined">
    <div class="card">
    <table class="table">
      <tr class="t-row">
        <td class="score" colspan="1" >Single-Core Score</td>
        <td class="score" colspan="1" >{{mac.single_score}}</td> 
      </tr>
      <tr class="t-row">
        <td class="score" colspan="1" >Multi-Core Score</td>
        <td class="score" colspan="1" >{{mac.multi_score}}</td> 
      </tr>
      <tr class="t-row">
        <td class="score" colspan="1" >Model Identifier</td>
        <td class="score" colspan="1" >{{mac.model_identifier}}</td> 
      </tr>
      <tr class="t-row">
        <td class="score" colspan="1" >Processor</td>
        <td class="score" colspan="1" >{{mac.processor}}</td> 
      </tr>
      <tr class="t-row">
        <td class="score" colspan="1" >Processor Frequency</td>
        <td class="score" colspan="1" >{{mac.processor_freq}}</td> 
      </tr>
      <tr class="t-row">
        <td class="score" colspan="1" >Processors</td>
        <td class="score" colspan="1" >{{mac.processor_count}}</td> 
      </tr>
      <tr class="t-row">
        <td class="score" colspan="1" >Processor Cores</td>
        <td class="score" colspan="1" >{{mac.processor_cores}}</td> 
      </tr>
      <tr class="t-row">
        <td class="score" colspan="1" >Processor Threads</td>
        <td class="score" colspan="1" >{{mac.processor_threads}}</td> 
      </tr>
      <tr class="t-row">
        <td class="score" colspan="1" >Price</td>
        <td class="score" colspan="1"  v-if="mac.price !== 0" > $ {{mac.price}} </td> 
        <td class="score" colspan="1"  v-else > <div class="input-group">
                          <span class="input-group-prepend">
                            <span class="input-group-text">$</span>
                          </span>
                          <input v-model="price" type="text" class="form-control text-right" style="max-width: 100px;" aria-label="Amount (to the nearest dollar)">
                        </div> </td> 
      </tr>
      <tr class="t-row">
        <td class="score" colspan="1" >Sinle-score per $</td>
        <td class="score" colspan="1" v-if=" mac.price !== 0" >{{ ( mac.single_score / mac.price ).toFixed(2) }}</td> 
        <td class="score" colspan="1" v-else >{{ parseInt(singleRatio) == Number.POSITIVE_INFINITY ? "" : singleRatio }}</td> 
      </tr>
      <tr class="t-row">
        <td class="score" colspan="1" >Multi-score per $</td>
        <td class="score" colspan="1" v-if=" mac.price !== 0" >{{ ( mac.multi_score / mac.price ).toFixed(2) }}</td> 
        <td class="score" colspan="1" v-else >{{ parseInt(multiRatio) == Number.POSITIVE_INFINITY ? "" : multiRatio }}</td> 
      </tr>
      <tr class="t-row">
        <td class="score" colspan="1" >Scores From</td>
        <td class="score" colspan="1" > <a :href="geekBenchLink(mac._id)"> <img src="../../img/geekbench.png"  style="width: 25px;" > GeekBench.com</a></td>
      </tr>
    </table>
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
import datas from '../../db.json'
export default {
  name: 'MacProfile',
  data () {
    return {
      mac: null,
      price: '',
      multiRatio: '',
      singleRatio: '',
    }
  },
  watch: {
    'price' : 'calculate'
  },
  created () {
    let id = this.$route.params.id.split("-")
    datas.macs.forEach(mac => {
      if(mac._id === id[id.length-1])
      this.mac = mac
    });
  },
  methods: {
    homeLink () {
      this.$router.push({name: 'home'})
    },
    geekBenchLink (id) {
      return `https://browser.geekbench.com/macs/${id}`
    },
    calculate () {
      this.singleRatio = this.mac.single_score !== 0 || this.price !==  0 ? ( (this.mac.single_score / this.price).toFixed(2) == Number.POSITIVE_INFINITY || (this.mac.single_score / this.price).toFixed(2) == Number.NAN ? '' : (this.mac.single_score / this.price ).toFixed(2) ) : ''
      this.multiRatio = this.mac.multi_score !== 0 || this.price !==  0 ? ( (this.mac.multi_score / this.price).toFixed(2) == Number.POSITIVE_INFINITY || (this.mac.multi_score / this.price).toFixed(2) == Number.NAN ? '' : (this.mac.multi_score / this.price ).toFixed(2) ) : ''
    }
  }
}
</script>
<style scoped>


.score {
  border: 1px solid;
}
.title {
  font-family:monospace;
  font-style: oblique;
  font-stretch:extra-expanded;
  font-size: 2.5em;
  color:  cornflowerblue;
  padding-top: 1em;
  }
.t-row {
  border: 2px ridge ;
}
.table {
  width: 100% !important;
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
  
.Mytable {
  position: relative;
    width: 65%;
    min-height: 1px;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
}

</style>