<template>
<div>
  <a href="https://github.com/batin/MacScores"><button type="button" class="leftbar btn btn-github"><i class="fe fe-github"></i> Github</button></a>
  <div class="row">
    <div class="col-2"></div>
    <div class="inputs col-8">
      <p class="title">Mac Scores</p>
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
        <button type="button" @click="clear" class="clear btn btn-icon btn-primary btn-yellow"> Clear </button>
      </div>
      </div>
      </div>
      <div class="col-2"></div>
    </div>
    <t-table
    cards
    vertical-align="center"
    class="table-outline table-hover"
    id="table">
      <table-head class="table card-table table-vcenter text-nowrap datatable dataTable no-footer">
        <table-row class="t-row">
          <table-cel colspan="2" class="unselectable"  header>Name</table-cel>
          <table-cel colspan="2" class="unselectable"  header>Description</table-cel>
          <table-cel class="sorting" colspan="1" header> <span class="unselectable" @click="sortSingle"> Single-Core Score </span></table-cel>
          <span class="unselectable" @click="sortMulti"><table-cel class="sorting" colspan="1" header>  Multi-Core Score </table-cel></span>
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
import MacService from '@/services/MacService.js'
import  { Table, TableBody, TableCel, TableHead, TableRow } from './index.js'
import MacItem from './MacItem.vue'

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
    this.getMacs()
    this.loading = false
  },
  components: {
    MacService,
    Table,
    TableBody,
    TableCel,
    TableHead,
    TableRow,
    MacItem
  },
  methods: {
    async getMacs () {
      const response = await MacService.fetchMacs()
      //const response = await MacService.updateDB()
      this.macs = response.rows
      this.fillTable (response.rows)
    },
    fillTable (macs) {
      this.tableItems = macs
    },
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
          return mac.doc.name.toLowerCase().includes(this.nameFilter.toLowerCase())
        }) 
      tempMacArray = this.findCommonItems (tempMacArray,this.filteredMacs)
      }
      if (this.singleMinScore != '') {
        this.filteredMacs = this.macs.filter(mac => {  
          return mac.doc.single_score >= this.singleMinScore
        })
        tempMacArray = this.findCommonItems (tempMacArray,this.filteredMacs)
      }
      if (this.singleMaxScore != '') {
        this.filteredMacs = this.macs.filter(mac => {  
          return mac.doc.single_score <= this.singleMaxScore
        })
      tempMacArray = this.findCommonItems (tempMacArray,this.filteredMacs)
      }
      if (this.minPrice != '') {
        this.filteredMacs = this.macs.filter(mac => {  
          return mac.doc.price >= this.minPrice
        })
      tempMacArray = this.findCommonItems (tempMacArray,this.filteredMacs)
      }
      if (this.maxPrice != '') {
        this.filteredMacs = this.macs.filter(mac => {  
          return mac.doc.price <= this.maxPrice
        })
      tempMacArray = this.findCommonItems (tempMacArray,this.filteredMacs)
      }
      if (this.multiMinScore != '') {
        this.filteredMacs = this.macs.filter(mac => {  
          return mac.doc.multi_score >= this.multiMinScore
        })
      tempMacArray = this.findCommonItems (tempMacArray,this.filteredMacs)
      }
      if (this.multiMaxScore != '') {
        this.filteredMacs = this.macs.filter(mac => {  
          return mac.doc.multi_score <= this.multiMaxScore
        })
      tempMacArray = this.findCommonItems (tempMacArray,this.filteredMacs)  
      }          
      this.fillTable(tempMacArray)
      this.loading = false
    },
    findCommonItems (array1,array2) {
     return array1.filter(x => array2.includes(x))
    },
    sortSingle () {     
      let sorted
      if (this.singleFlag) {
        sorted =  this.tableItems.sort((a, b) => {return (a.doc.single_score < b.doc.single_score) ? 1 : -1})
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
        sorted =  this.tableItems.sort((a, b) => {return (a.doc.multi_score < b.doc.multi_score) ? 1 : -1})
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
        sorted =  this.tableItems.sort((a, b) => {return (a.doc.price < b.doc.price) ? 1 : -1})
        this.priceFlag = false
      } else {
        sorted = this.tableItems.reverse()
        this.priceFlag = true
      }
      this.fillTable(sorted)
    },
    sortPerDollar () {
      let sorted =  this.tableItems.sort((a, b) => {
        let ratio1 = (a.doc.multi_score/(a.doc.price) == 0 ? 1 : a.doc.price ).toFixed(2)
        let ratio2 = (b.doc.multi_score/(b.doc.price) == 0 ? 1 : b.doc.price ).toFixed(2)
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
border: 3px solid cornflowerblue;
width: 80%;
margin: auto;
background-color: white;
display: table;
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
margin-top: 2%;
margin-bottom: 4%;
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

.sorting_desc {
  position: relative;
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
  }
</style>