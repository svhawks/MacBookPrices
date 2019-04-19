<template>
<div>
  <a href="https://github.com/batin/MacScores"><button type="button" class="leftbar btn btn-github"><i class="fe fe-github"></i> Github</button></a>
  
        <p class="title">Mac Scores</p>
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
            <button type="button" @click="clear" class="clear btn btn-icon btn-primary btn-primary5"> Clear </button>
          </div>
        </div>
      </div>
        </div>
        <div class="card table">
      <t-table
      cards
      vertical-align="center"
      class="table-outline table-hover"
      id="table">
        <table-head class="table card-table table-vcenter text-nowrap datatable dataTable">
          <table-row class="t-row">
            <table-cel colspan="2" class="unselectable"  header>Name</table-cel>
            <table-cel colspan="2" class="unselectable"  header>Description</table-cel>
            <table-cel class="sorting" colspan="1" header> <span class="unselectable" @click="sortSingle"> Single-Core Score </span></table-cel>
            <table-cel class="sorting" colspan="1" header> <span class="unselectable" @click="sortMulti"> Multi-Core Score </span></table-cel>
            <table-cel class="sorting" colspan="1" header> <span class="unselectable" @click="sortPrice"> Price </span></table-cel>
            <table-cel class="sorting" colspan="1" header> <span class="unselectable" @click="sortPerDollar"> Multi-score per $ </span></table-cel>
          </table-row>
        </table-head>
      <table-body v-for="mac in tableItems" :key="mac.id">
        <MacItem :mac=mac ></MacItem>
      </table-body>
    </t-table>
    </div>
  </div>
</template>

<script>
import  { Table, TableBody, TableCel, TableHead, TableRow } from './index.js'
import MacItem from './MacItem.vue'
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      loading: false,
      tableItems: [],
      macs: [],
      filteredMacs: [],
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
      perDFlag: true,  
    }
  },
  watch: {
    'nameFilter': 'filterFunc',
    'singleMinScore': 'filterFunc',
    'singleMaxScore': 'filterFunc',
    'minPrice': 'filterFunc',
    'maxPrice': 'filterFunc',
    'multiMinScore': 'filterFunc',
    'multiMaxScore': 'filterFunc'
  },
  created () {
    this.loading = true
    
    axios.get('https://batin.github.io/MacScoresDB/db.json')
      .then(macs => {
        this.macs =  macs.data.macs        
        this.tableItems = this.macs
      })
      .catch(err => {
        console.log(err)
      })
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
      this.fillTable(sorted)
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
      this.fillTable(sorted)
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
      this.fillTable(sorted)
    },
    sortPerDollar () {
      let sorted =  this.tableItems.sort((a, b) => {
        let ratio1 = (a.multi_score/(a.price) == 0 ? 1 : a.price ).toFixed(2)
        let ratio2 = (b.multi_score/(b.price) == 0 ? 1 : b.price ).toFixed(2)
        if (this.perDFlag) {  
          this.perDFlag = false
          return (ratio1 < ratio2) ? 1 : -1
        } else {
          this.perDFlag = true
          return (ratio1 > ratio2) ? 1 : -1
        }
        })
      this.fillTable(sorted)
    }
  }  
}
</script>

<style>
#table {
  border: 1px solid rgba(0, 40, 100, 0.12);
  margin: auto;
  background-color: white;
  display: table;
  width: 100%
}
.table {
  width: 80%;
  margin: auto;
}
.t-row {
  text-align: -webkit-match-parent;
}

.leftbar {
  left: 0;
  margin: 1%;
  position: fixed;
  z-index: 999;
}

.clear {
  position: absolute;
  right: 0.9em;
  margin-top: 0.5em;
}

.inputs {
  padding: 3%;
  margin: auto;
  margin-bottom: 4%;
  width: 79%;
}

thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
  cursor: pointer;
}

.sorting:after { 
  bottom: 5px;
  content: "\e92d";
  font-family: 'feather' !important;
}

.sorting:before {
  top: 5px;
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

.title {
  font-family:monospace;
  font-style: oblique;
  font-stretch:extra-expanded;
  font-size: 4em;
  text-align: center;
  color:  cornflowerblue;
  padding-top: 1em;
  }


</style>