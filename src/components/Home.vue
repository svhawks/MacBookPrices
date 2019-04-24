<template>
<div>
  <a href="https://github.com/batin/MacScores"><button type="button" class="leftbar btn btn-github"><i class="fe fe-github"></i> Github</button></a>
  
        <p class="homeTitle">Mac Scores</p>
    <div class="row">      
    <div class="card  inputs">
        <div class="form-group search">
          <p>Search</p>
          <div class="input-icon">
            <input type="text" class="form-control" v-model="nameFilter" placeholder="Search for...">
              <span class="input-icon-addon">
                <i class="fe fe-search"></i>
              </span>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <p>Single-Score</p>
            <input type="number" class="form-control" v-model="singleMinScore" placeholder="Min">
            <input type="number" class="form-control" v-model="singleMaxScore" placeholder="Max">
            <input type="radio"  name="select" value="true" v-model="onMarket">
          <label for="one">On-Market</label>
          <br>
          <input type="radio" name="select" value="false" v-model="onMarket">
          <label for="two">Not On-Market</label>
          <br>
          </div>
          <div class="col-4">
            <p>Multi-Score</p>
            <input type="number" class="form-control" v-model="multiMinScore" placeholder="Min">
            <input type="number" class="form-control" v-model="multiMaxScore" placeholder="Max">
          </div>
          <div class="col-4">
            <p>Price</p>
            <input type="number" class="form-control" v-model="minPrice" placeholder="Min">
            <input type="number" class="form-control" v-model="maxPrice" placeholder="Max">
            <button type="button" @click="clear" class="clear btn btn-icon btn-primary"> Clear </button>
          </div>
          
        </div>
      </div>
        </div>
        <div class="card table" v-show="AddedItems.length > 0">
      <t-table
      cards
      vertical-align="center"
      class="table-outline table-hover"
      id="table2">
        <table-head class="table card-table table-vcenter">
          <table-row class="t-row">
            <table-cel colspan="2" class="unselectable"  header>Remove</table-cel>
            <table-cel colspan="2" class="unselectable"  header>Name</table-cel>
            <table-cel colspan="2" class="unselectable"  header>Description</table-cel>
            <table-cel colspan="1" header> <p @click="sortSingle" class="sorting"></p><span class="unselectable mini" @click="sortSingle"> Single - Core Score </span></table-cel>
            <table-cel colspan="1" header> <p @click="sortMulti" class="sorting"></p><span class="unselectable mini" @click="sortMulti"> Multi - Core Score </span></table-cel>
            <table-cel colspan="1" header> <p @click="sortPrice" class="sorting"></p><span class="unselectable" @click="sortPrice"> Price </span></table-cel>
            <table-cel colspan="1" header> <p @click="sortPerDollarSingle" class="sorting"></p><span class="unselectable mini" @click="sortPerDollarSingle"> Single-score per $ </span></table-cel>
            <table-cel colspan="1" header> <p @click="sortPerDollarMulti" class="sorting"></p><span class="unselectable mini" @click="sortPerDollarMulti"> Multi-score per $ </span></table-cel>
          </table-row>
        </table-head>
      <table-body v-for="mac in AddedItems" :key="mac.id">
        <MacItem :mac=mac v-on:removed="removed"></MacItem>
      </table-body>
    </t-table>
    </div>
        <div class="card table">
      <t-table
      cards
      vertical-align="center"
      class="table-outline table-hover"
      id="table2">
        <table-head class="table card-table table-vcenter">
          <table-row class="t-row">
            <table-cel colspan="2" class="unselectable"  header>Add</table-cel>
            <table-cel colspan="2" class="unselectable"  header>Name</table-cel>
            <table-cel colspan="2" class="unselectable"  header>Description</table-cel>
            <table-cel colspan="1" header> <p @click="sortSingle" class="sorting"></p><span class="unselectable mini" @click="sortSingle"> Single - Core Score </span></table-cel>
            <table-cel colspan="1" header> <p @click="sortMulti" class="sorting"></p><span class="unselectable mini" @click="sortMulti"> Multi - Core Score </span></table-cel>
            <table-cel colspan="1" header> <p @click="sortPrice" class="sorting"></p><span class="unselectable" @click="sortPrice"> Stock-Price </span></table-cel>
            <table-cel colspan="1" header> <p @click="sortPerDollarSingle" class="sorting"></p><span class="unselectable mini" @click="sortPerDollarSingle">Single-score per $</span></table-cel>
            <table-cel colspan="1" header> <p @click="sortPerDollarMulti" class="sorting"></p><span class="unselectable mini" @click="sortPerDollarMulti">Multi-score per $</span></table-cel>
          </table-row>
        </table-head>
      <table-body v-for="mac in tableItems" :key="mac.id">
          <MacItem :mac=mac v-on:added="added"  ></MacItem>
      </table-body>
    </t-table>
    </div>
  </div>
</template>

<script>
import  { Table, TableBody, TableCel, TableHead, TableRow } from './index.js'
import MacItem from './MacItem.vue'
import datas from '../../db.json'
import { log } from 'util';
export default {
  name: 'Home',
  data () {
    return {
      loading: false,
      tableItems: [],
      macs: [],
      filteredMacs: [],
      AddedItems: [],
      nameFilter: '',
      singleMinScore: '',
      singleMaxScore: '',
      minPrice: '',
      maxPrice: '',
      multiMinScore: '',
      multiMaxScore: '',
      singleFlag: true,  
      multiFlag: true,  
      priceFlag: true,  
      perDFlagM: true,  
      perDFlagS: true,  
      onMarket: "true"
    }
  },
  watch: {
    'nameFilter': 'filterFunc',
    'singleMinScore': 'filterFunc',
    'singleMaxScore': 'filterFunc',
    'minPrice': 'filterFunc',
    'maxPrice': 'filterFunc',
    'multiMinScore': 'filterFunc',
    'multiMaxScore': 'filterFunc',
    'onMarket': 'showOnMarket'
  },
  created () {
    this.loading = true
    this.macs = datas.macs
    this.tableItems = this.macs
    this.showOnMarket()
    this.loading = false
  },
  components: {
    Table,
    TableBody,
    TableCel,
    TableHead,
    TableRow,
    MacItem
  },
  methods: {
    clear () {
      this.loading = true
      this.nameFilter = ''
      this.singleMinScore = ''
      this.singleMaxScore = ''
      this.multiMaxScore = ''
      this.multiMinScore = ''
      this.minPrice = ''
      this.maxPrice = ''
      this.loading = false
    },
    filterFunc () {
      this.loading = true
      let tempMacArray = this.macs
      if (this.nameFilter !== '') {
         this.filteredMacs =  this.macs.filter(mac => {           
          return mac.name.toLowerCase().includes(this.nameFilter.toLowerCase())
        }) 
      tempMacArray = this.findCommonItems (tempMacArray,this.filteredMacs)
      }
      if (this.singleMinScore != '') {
        this.filteredMacs = this.macs.filter(mac => {  
          return mac.single_score >= this.singleMinScore
        })
        tempMacArray = this.findCommonItems (tempMacArray,this.filteredMacs)
      }
      if (this.singleMaxScore != '') {
        this.filteredMacs = this.macs.filter(mac => {  
          return mac.single_score <= this.singleMaxScore
        })
      tempMacArray = this.findCommonItems (tempMacArray,this.filteredMacs)
      }
      if (this.minPrice != '') {
        this.filteredMacs = this.macs.filter(mac => {  
          return mac.price >= this.minPrice
        })
      tempMacArray = this.findCommonItems (tempMacArray,this.filteredMacs)
      }
      if (this.maxPrice != '') {
        this.filteredMacs = this.macs.filter(mac => {  
          return mac.price <= this.maxPrice
        })
      tempMacArray = this.findCommonItems (tempMacArray,this.filteredMacs)
      }
      if (this.multiMinScore != '') {
        this.filteredMacs = this.macs.filter(mac => {  
          return mac.multi_score >= this.multiMinScore
        })
      tempMacArray = this.findCommonItems (tempMacArray,this.filteredMacs)
      }
      if (this.multiMaxScore != '') {
        this.filteredMacs = this.macs.filter(mac => {  
          return mac.multi_score <= this.multiMaxScore
        })
      tempMacArray = this.findCommonItems (tempMacArray,this.filteredMacs)  
      }          
      this.tableItems = tempMacArray
      this.loading = false
    },
    findCommonItems (array1,array2) {
     return array1.filter(x => array2.includes(x))
    },
    sortSingle () {     
      let sorted
      if (this.singleFlag) {
        sorted =  this.tableItems.sort((a, b) => {return (a.single_score < b.single_score) ? 1 : -1})
        this.singleFlag = false
      } else {
        sorted =  this.tableItems.reverse()
        this.singleFlag = true
      }
      this.tableItems = sorted
    },
    sortMulti () {
      let sorted
      if (this.multiFlag) {
        sorted =  this.tableItems.sort((a, b) => {return (a.multi_score < b.multi_score) ? 1 : -1})
        this.multiFlag = false
      } else {
        sorted =  this.tableItems.reverse()
        this.multiFlag = true
      } 
      this.tableItems = sorted
    },
    sortPrice () {  
      let sorted
      if (this.priceFlag) {   
        sorted =  this.tableItems.sort((a, b) => {return (a.price < b.price) ? 1 : -1})
        this.priceFlag = false
      } else {
        sorted = this.tableItems.reverse()
        this.priceFlag = true
      }
      this.tableItems = sorted
    },
    sortPerDollarMulti () {
      let sorted =  this.tableItems.sort((a, b) => {
        let ratio1 = (a.multi_score !==0 && a.price !== 0) ? (a.multi_score / a.price ) : 0
        let ratio2 = (b.multi_score !==0 && b.price !== 0) ? (b.multi_score / b.price ) : 0
        return ((ratio1 < ratio2) ? -1 : ((ratio1 > ratio2) ? 1 : 0))
      })
        if (this.perDFlagM) {  
          this.perDFlagM = false
          this.tableItems = sorted
        } else {
          this.perDFlagM = true
          this.tableItems = sorted.reverse()
        }
    },
    sortPerDollarSingle () {
      let sorted =  this.tableItems.sort((a, b) => {
        let ratio1 = (a.single_score !==0 && a.price !== 0) ? (a.single_score / a.price ) : 0
        let ratio2 = (b.single_score !==0 && b.price !== 0) ? (b.single_score / b.price ) : 0
        return ((ratio1 < ratio2) ? -1 : ((ratio1 > ratio2) ? 1 : 0))
      })
        if (this.perDFlagS) {  
          this.perDFlagS = false
          this.tableItems = sorted
        } else {
          this.perDFlagS = true
          this.tableItems = sorted.reverse()
        }
    },
    showOnMarket () {
      let availableMacs
      if(this.onMarket == "true") {
        availableMacs = this.macs.filter(mac => {
           return mac.price > 0
         })
      } else {
        console.log("onmarket degil")
        availableMacs = this.macs.filter(mac => {
           return mac.price == 0
         })
      }
      this.tableItems = availableMacs
    },
    clone (src) {
      return Object.assign({}, src);
    },
    added (value) {      
      let item = this.clone(value)
      let flag = true
      this.AddedItems.forEach(mac => {
        if(mac._id === item._id){
          flag = false
        }
      })
      if(flag){
        item.price = -1
        this.AddedItems.push(item)
      }
    },
    removed (value) {
      console.log('aaaaaa');
      if(this.AddedItems.includes(value)){
        this.AddedItems.splice( this.AddedItems.indexOf(value), 1 );
      }
    }
  }
}
</script>

<style>

</style>