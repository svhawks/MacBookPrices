<template>
<div>
  <button type="button" class="leftbar btn btn-github"><i class="fe fe-github"></i> Github</button>
  <div class="row">
    <div class="col-2"></div>
    <div class="inputs col-8">
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
      <input type="text" class="form-control" v-model="singleMinScore" placeholder="Min">
      <input type="text" class="form-control" v-model="singleMaxScore" placeholder="Max">
      </div>
      <div class="col-4">
        <p>Multi-Score</p>
        <input type="text" class="form-control" v-model="multiMinScore" placeholder="Min">
        <input type="text" class="form-control" v-model="multiMaxScore" placeholder="Max">
      </div>
      <div class="col-4">
        <p>Price</p>
        <input type="text" class="form-control" v-model="minPrice" placeholder="Min">
        <input type="text" class="form-control" v-model="maxPrice" placeholder="Max">
        <button type="button" @click="clear" class="clear btn btn-icon btn-primary btn-danger"> Clear </button>
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
      <table-head>
        <table-row class="t-row">
          <table-cel colspan="2" header>Name</table-cel>
          <table-cel colspan="2" header>Description</table-cel>
          <table-cel colspan="1" header>Single-Core Score</table-cel>
          <table-cel colspan="1" header>Multi-Core Score</table-cel>
          <table-cel colspan="1" header>Price</table-cel>
          <table-cel colspan="1" header>Multi-score per $</table-cel>
        </table-row>
      </table-head>
    <table-body v-for="mac in tableItems" :key="mac.id">
        <MacItem :mac=mac ></MacItem>
      </table-body>
    </t-table>
  </div>
</template>

<script>
import MacService from '@/services/MacService.js'
import  { Table, TableBody, TableCel, TableHead, TableRow } from './btn.js'
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
      multiMaxScore: ''
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
      this.tableItems = []            
      this.fillTable(tempMacArray)
      this.loading = false
    },
    findCommonItems (array1,array2) {
     return array1.filter(x => array2.includes(x))
     
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
}
.t-row {
  text-align: -webkit-match-parent;
}
.leftbar {
  left: 0;
  margin: 1%;
  position: fixed;
}
.clear {
  position: absolute;
  right: 0.9em;
  margin-top: 0.2em;

}
.inputs {
margin-top: 2%;
margin-bottom: 4%;
}
</style>