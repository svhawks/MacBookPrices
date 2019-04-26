<template>
  <div>
    <div class="github">
      <a href="https://github.com/svtek/MacScores"><img alt="GitHub" class="stars" src="https://img.shields.io/github/stars/svtek/MacScores.svg?style=social"></a>
    </div>  
    <div class="my-3 my-md-5">
      <div class="container">  
        <div class="row">
                  <div class="col-sm-6 col-lg-3">
                    <div class="card">
                      <div class="card-body">
                        <h3 class="mb-1">Best Product</h3>
                        <a :href="profileLink(bestProduct.id)">{{bestProduct.name}}</a>
                        <div class="text-muted">${{bestProduct.price}}</div>
                      </div>
                     
                    </div>
                  </div>
                  <div class="col-sm-6 col-lg-3">
                    <div class="card">
                      <div class="card-body">
                        <h3 class="mb-1">Best Macbook</h3>
                        <a :href="profileLink(bestMacbook.id)">{{bestMacbook.name}}</a>
                        <div class="text-muted">${{bestMacbook.price}}</div>
                      </div>
                     
                    </div>
                  </div>
                  <d<div class="col-sm-6 col-lg-3">
                    <div class="card">
                      <div class="card-body">
                        <h3 class="mb-1">Best iMac</h3>
                        <a :href="profileLink(bestIMac.id)">{{bestIMac.name}}</a>
                        <div class="text-muted">${{bestIMac.price}}</div>
                      </div>
                     
                    </div>
                  </div> 
                  <div class="col-sm-6 col-lg-3">
                    <div class="card">
                      <div class="card-body">
                        <h3 class="mb-1">Best Mac Mini</h3>
                        <a :href="profileLink(bestMacMini.id)">{{bestMacMini.name}}</a>
                        <div class="text-muted">${{bestMacMini.price}}</div>
                      </div>
                     
                    </div>
                  </div>
                </div>
        <div class="col-12">
          <div class="row row-cards">
            <div class="card inputs mt-5" style="padding: unset!important">
              <div class="card-header">
                <h3 class="card-title">Mac Scores</h3>
              </div>
              <div class="card-body">
                <div class="form-group search">
                  <p>Search</p>
                  <div class="input-icon">
                    <input
                      type="text"
                      class="form-control"
                      v-model="nameFilter"
                      placeholder="Search for..."
                    >
                    <span class="input-icon-addon">
                      <i class="fe fe-search"></i>
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3">
                    <div class="form-group">
                      <label class="text-center form-label">Single-Score</label>
                      <div class="input-group">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Min"
                          v-model="singleMinScore"
                        >
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Max"
                          v-model="singleMaxScore"
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="form-group">
                      <label class="text-center form-label">Multi Score</label>
                      <div class="input-group">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Min"
                          v-model="multiMinScore"
                        >
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Max"
                          v-model="multiMaxScore"
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="form-group">
                      <label class="text-center form-label">Price</label>
                      <div class="input-group">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Min"
                          v-model="minPrice"
                        >
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Max"
                          v-model="maxPrice"
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="form-group">
                      <label class="text-center form-label"></label>
                      <label class="custom-switch mt-5">
                        <input
                          type="checkbox"
                          class="custom-switch-input"
                          name="example-inline-radios"
                          value="true"
                          v-model="onMarket"
                        >
                        <span class="custom-switch-indicator"/>
                        <span class="custom-switch-description">items on the market</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <button @click="filterBtn('all')" class="btn btn-primary">All</button> &nbsp
              <button @click="filterBtn('macbook')" class="btn btn-primary">Macbook</button> &nbsp
              <button @click="filterBtn('imac')" class="btn btn-primary">iMac</button> &nbsp
              <button @click="filterBtn('mac mini')" class="btn btn-primary">Mac mini</button> &nbsp
            </div>
            <div class="table-responsive">
              <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                <table
                  id="DataTables_Table_0"
                  class="table card-table table-vcenter text-nowrap datatable dataTable no-footer"
                >
                <thead>
                    <tr role="row">
                      <th class="sorting unselectable" tabindex="0" rowspan="1" colspan="1" style="width: 50px;">
                        Name
                      </th>
                      <th class="sorting unselectable" tabindex="0" rowspan="1" colspan="1" style="width: 50px;">
                        Description
                      </th>
                      <th @click="sortSingle" class="sorting unselectable" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" style="width: 50px;">
                        Single - Core Score
                      </th>
                      <th @click="sortMulti" class="sorting unselectable" tabindex="0" rowspan="1" colspan="1" style="width: 50px;" >
                        Multi - Core Score
                      </th>
                      <th @click="sortPrice" class="sorting unselectable" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" style="width: 50px;">
                        Stock-Price
                      </th>
                      <th @click="sortPerDollarSingle" class="sorting unselectable" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" style="width: 50px;">
                        Single-score per $
                      </th>
                      <th @click="sortPerDollarMulti" class="sorting unselectable" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" style="width: 50px;">
                        Multi-score per $
                      </th>
                      <th class="sorting unselectable" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1">
                        Buy
                      </th>
                      <th class="sorting unselectable" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1">
                        Edit On Github
                      </th>
                    </tr>
                  </thead>
                  <tbody v-for="mac in tableItems" :key="mac.id">
                    <MacItem :mac="mac"></MacItem>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MacItem from "./MacItem.vue"
import datas from "../../db.json"
import { log } from "util"
export default {
  name: "Home",
  data() {
    return {
      loading: false,
      tableItems: [],
      macs: [],
      filteredMacs: [],
      AddedItems: [],
      nameFilter: "",
      singleMinScore: "",
      singleMaxScore: "",
      minPrice: "",
      maxPrice: "",
      multiMinScore: "",
      multiMaxScore: "",
      singleFlag: true,
      multiFlag: true,
      priceFlag: true,
      perDFlagM: true,
      perDFlagS: true,
      onMarket: true,
      bestProduct: {
        name: '',
        id: '',
        price: ''
      },
      bestMacbook:  {
        name: '',
        id: '',
        price: ''
      },
      bestIMac:  {
        name: '',
        id: '',
        price: ''
      },
      bestMacMini:  {
        name: '',
        id: '',
        price: ''
      },
    }
  },
  watch: {
    nameFilter: "filterFunc",
    singleMinScore: "filterFunc",
    singleMaxScore: "filterFunc",
    minPrice: "filterFunc",
    maxPrice: "filterFunc",
    multiMinScore: "filterFunc",
    multiMaxScore: "filterFunc",
    onMarket: "showOnMarket"
  },
  created() {
    this.loading = true;
    this.macs = datas.macs;
    this.tableItems = this.macs;
    this.showOnMarket();
    this.bestProduct = this.findBest('')
    this.bestMacbook = this.findBest('macbook')
    this.bestIMac = this.findBest('imac')
    this.bestMacMini = this.findBest('mac mini')
    this.loading = false;
  },
  components: {
    MacItem
  },
  methods: {
    clear() {
      this.loading = true
      this.nameFilter = ""
      this.singleMinScore = ""
      this.singleMaxScore = ""
      this.multiMaxScore = ""
      this.multiMinScore = ""
      this.minPrice = ""
      this.maxPrice = ""
      this.loading = false
    },
    filterFunc() {
      this.loading = true
      let tempMacArray = this.macs
      if (this.nameFilter !== "") {
        this.filteredMacs = this.macs.filter(mac => {
          return mac.name.toLowerCase().includes(this.nameFilter.toLowerCase())
        })
        tempMacArray = this.findCommonItems(tempMacArray, this.filteredMacs)
      }
      if (this.singleMinScore != "") {
        this.filteredMacs = this.macs.filter(mac => {
          return mac.single_score >= this.singleMinScore
        })
        tempMacArray = this.findCommonItems(tempMacArray, this.filteredMacs)
      }
      if (this.singleMaxScore != "") {
        this.filteredMacs = this.macs.filter(mac => {
          return mac.single_score <= this.singleMaxScore
        })
        tempMacArray = this.findCommonItems(tempMacArray, this.filteredMacs)
      }
      if (this.minPrice != "") {
        this.filteredMacs = this.macs.filter(mac => {
          return mac.price >= this.minPrice
        })
        tempMacArray = this.findCommonItems(tempMacArray, this.filteredMacs)
      }
      if (this.maxPrice != "") {
        this.filteredMacs = this.macs.filter(mac => {
          return mac.price <= this.maxPrice
        })
        tempMacArray = this.findCommonItems(tempMacArray, this.filteredMacs)
      }
      if (this.multiMinScore != "") {
        this.filteredMacs = this.macs.filter(mac => {
          return mac.multi_score >= this.multiMinScore
        })
        tempMacArray = this.findCommonItems(tempMacArray, this.filteredMacs)
      }
      if (this.multiMaxScore != "") {
        this.filteredMacs = this.macs.filter(mac => {
          return mac.multi_score <= this.multiMaxScore
        })
        tempMacArray = this.findCommonItems(tempMacArray, this.filteredMacs)
      }
      this.tableItems = tempMacArray
      this.loading = false
    },
    findCommonItems(array1, array2) {
      return array1.filter(x => array2.includes(x))
    },
    sortSingle() {
      let sorted
      if (this.singleFlag) {
        sorted = this.tableItems.sort((a, b) => {
          return a.single_score < b.single_score ? 1 : -1
        })
        this.singleFlag = false
      } else {
        sorted = this.tableItems.reverse()
        this.singleFlag = true
      }
      this.tableItems = sorted
    },
    sortMulti() {
      let sorted
      if (this.multiFlag) {
        sorted = this.tableItems.sort((a, b) => {
          return a.multi_score < b.multi_score ? 1 : -1
        })
        this.multiFlag = false
      } else {
        sorted = this.tableItems.reverse()
        this.multiFlag = true
      }
      this.tableItems = sorted
    },
    sortPrice() {
      let sorted
      if (this.priceFlag) {
        sorted = this.tableItems.sort((a, b) => {
          return a.price < b.price ? 1 : -1
        })
        this.priceFlag = false
      } else {
        sorted = this.tableItems.reverse()
        this.priceFlag = true
      }
      this.tableItems = sorted
    },
    sortPerDollarMulti() {
      let sorted = this.tableItems.sort((a, b) => {
        let ratio1 =
          a.multi_score !== 0 && a.price !== 0 ? a.multi_score / a.price : 0
        let ratio2 =
          b.multi_score !== 0 && b.price !== 0 ? b.multi_score / b.price : 0
        return ratio1 < ratio2 ? -1 : ratio1 > ratio2 ? 1 : 0
      })
      if (this.perDFlagM) {
        this.perDFlagM = false
        this.tableItems = sorted
      } else {
        this.perDFlagM = true
        this.tableItems = sorted.reverse()
      }
    },
    sortPerDollarSingle() {
      let sorted = this.tableItems.sort((a, b) => {
        let ratio1 = a.single_score !== 0 && a.price !== 0 ? a.single_score / a.price : 0
        let ratio2 = b.single_score !== 0 && b.price !== 0 ? b.single_score / b.price : 0
        return ratio1 < ratio2 ? -1 : ratio1 > ratio2 ? 1 : 0
      })
      if (this.perDFlagS) {
        this.perDFlagS = false
        this.tableItems = sorted
      } else {
        this.perDFlagS = true
        this.tableItems = sorted.reverse()
      }
    },
    showOnMarket() {
      let availableMacs
      if (this.onMarket == true) {
        availableMacs = this.macs.filter(mac => {
          return mac.price > 0
        })
      } else {
        availableMacs = this.macs.filter(mac => {
          return mac.price == 0
        })
      }
      this.tableItems = availableMacs
    },
    filterBtn (filter) {
      if (filter === 'all') {
        this.nameFilter = ''
      }
      if (filter === 'macbook') {
        this.nameFilter = 'macbook'
      }
      if (filter === 'imac') {
        this.nameFilter = 'imac'
      }
      if (filter === 'mac mini') {
        this.nameFilter = 'mac mini'
      }
    },
    findBest (type) {
      let macs = this.macs.filter(mac => {
        return mac.name.toLowerCase().includes(type.toLowerCase())
      })
      macs = macs.sort((a, b) => {
      let ratio1 = a.single_score !== 0 && a.price !== 0 ? a.single_score / a.price : 0
      let ratio2 = b.single_score !== 0 && b.price !== 0 ? b.single_score / b.price : 0
      return ratio1 > ratio2 ? -1 : ratio1 < ratio2 ? 1 : 0
      })
      return {name : macs[0].model_identifier, price: macs[0].price, id: macs[0]._id }
      },
      profileLink(id) {
        return `/#/macs/${id}`
      }
    },
    
}
</script>

<style>
.github {
  margin: 1%;
  width: 25%;
  padding-left: 5%;
  padding-left: -15px;
  position: absolute
}
</style>
