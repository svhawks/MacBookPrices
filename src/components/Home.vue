<template>
  <div> 
    <a href="https://github.com/svtek/MacScores"><img style="position: absolute; top: -30px; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>
    
    <div class="my-3 my-md-5 mx-9">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6 col-lg-3">
            <div class="card geek">
              <div class="card-body text-center">
                <div> <a :href="geekBenchLink()"><img src="../../img/geekbench.png"  style="max-height: 3em;" > </a></div>
                <p></p>
                <div> Scores From</div>
                <p></p>
                <div> <a :href="geekBenchLink()"> Geekbench.com</a> </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="card">
              <div class="card-body">
                <h3 class="mb-1">Best Macbook Per $</h3>
                <a :href="profileLink(bestMacbook.id)">{{bestMacbook.name}}</a>
                <div class="text-muted">{{bestMacbook.description}}</div>
                <div class="text-muted">${{bestMacbook.price}}</div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="card">
              <div class="card-body">
                <h3 class="mb-1">Best iMac Per $</h3>
                <a :href="profileLink(bestIMac.id)">{{bestIMac.name}}</a>
                <div class="text-muted">{{bestIMac.description}}</div>
                <div class="text-muted">${{bestIMac.price}}</div>
              </div>
            </div>
          </div> 
          <div class="col-sm-6 col-lg-3">
            <div class="card">
              <div class="card-body">
                <h3 class="mb-1">Best Mac Mini Per $</h3>
                <a :href="profileLink(bestMacMini.id)">{{bestMacMini.name}}</a>
                <div class="text-muted">{{bestMacMini.description}}</div>
                <div class="text-muted">${{bestMacMini.price}}</div>
              </div>  
            </div>
          </div>
          </div>
          <div>
            <div>
              <div v-if="['macbook', 'all', 'imac', 'mac mini'].indexOf(selectedType) > -1" class="card">
                <div class="card-header">
                  <h3 class="card-title">Filter</h3>
                  <div class="card-options">
                    <button class="btn btn-sm btn-primary" @click="selectedType = ''"> Close </button>
                  </div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-4">
                      <div class="form-group">
                        <label class="text-center form-label">Single-Score</label>
                        <div class="input-group">
                          <input type="number" class="form-control" placeholder="Min" v-model="singleMinScore" @keyup="filterMacsAcrossFilters" >
                            <input type="number" class="form-control" placeholder="Max" v-model="singleMaxScore" @change="filterMacsAcrossFilters" >
                        </div>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="form-group">
                        <label class="text-center form-label">Multi Score</label>
                        <div class="input-group">
                          <input type="number" class="form-control" placeholder="Min" v-model="multiMinScore" >
                          <input type="number" class="form-control" placeholder="Max" v-model="multiMaxScore">
                        </div>
                      </div>
                    </div>
                    <div class="col-4">
                      <div class="form-group">
                        <label class="text-center form-label">Price</label>
                        <div class="input-group">
                          <input type="number" class="form-control" placeholder="Min" v-model="minPrice">
                          <input type="number" class="form-control" placeholder="Max" v-model="maxPrice">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="card">
              <div class="card-header">
                <div class="form-gruop">
                  <div class="input-icon">
                    <input v-model="nameFilter" style="width: 300px!important" type="text" class="form-control" placeholder="Search for..." @keyup="filterMacsAcrossFilters">
                    <span class="input-icon-addon">
                      <i class="fe fe-search"></i>
                    </span>
                  </div>
                </div>
                <div class="ml-3">
                  <button @click="filterBtn('all')" class="btn btn-secondary">All</button> 
                  <button @click="filterBtn('macbook')" class="btn btn-secondary">Macbook</button>
                  <button @click="filterBtn('imac')" class="btn btn-secondary">iMac</button>
                  <button @click="filterBtn('mac mini')" class="btn btn-secondary">Mac mini</button>
                </div>
                <div class="card-options">
                  <div class="form-group mt-4 ml-1">
                    <label class="text-center form-label"></label>
                    <label class="custom-switch">
                      <input type="checkbox" class="custom-switch-input" value="true" v-model="onMarket">
                        <span class="custom-switch-indicator"/>
                        <span class="custom-switch-description">On market</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="table table-responsive ">
                <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                  <table
                    id="DataTables_Table_0"
                    class="table table-vcenter text-nowrap datatable dataTable no-footer"
                    >
                    <thead>
                      <tr role="row">
                        <th class="sorting unselectable" tabindex="0" rowspan="1" colspan="1" style="width: 50px;">
                          Name
                        </th>
                        <th @click="sortGeneral('single_score')" class="sorting unselectable" tabindex="1" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" style="width: 80px;">
                          Single - Core Score
                        </th>
                        <th @click="sortGeneral('multi_score')" class="sorting unselectable" tabindex="2" rowspan="1" colspan="1" style="width: 80px;" >
                          Multi - Core Score
                        </th>
                        <th @click="sortGeneral('price')" class="sorting unselectable" tabindex="3" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" style="width: 50px;">
                          Stock-Price
                        </th>
                        <th @click="sortPerDollarSingle" class="sorting unselectable" tabindex="4" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" style="width: 80px;">
                          Single-score per $
                        </th>
                        <th @click="sortPerDollarMulti" class="sorting unselectable" tabindex="5" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" style="width: 80px;">
                          Multi-score per $
                        </th>
                        <th class="w-1 sorting unselectable" tabindex="6" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"/>
                      </tr>
                    </thead>
                    <div v-if="tableItems.length" style="display: contents;">
                      <tbody v-for="mac in tableItems" :key="mac.id">
                        <MacItem :mac="mac"></MacItem>
                      </tbody>
                    </div>
                    <div v-else class="card-body">
                       <span class="text-center d-inline"> <i class="fe fe-search"/>No Item Found </span>
                    </div>
                  </table>
                </div>
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
      selectedType: '',
      nameFilter: "",
      singleMinScore: '',
      singleMaxScore: '',
      minPrice: '',
      maxPrice: '',
      multiMinScore: '',
      multiMaxScore: '',
      sortField: '',
      perDFlagM: true,
      perDFlagS: true,
      onMarket: true,
      bestProduct: {
        name: '',
        description: '',
        id: '',
        price: ''
      },
      bestMacbook:  {
        name: '',
        description: '',
        id: '',
        price: ''
      },
      bestIMac:  {
        name: '',
        description: '',
        id: '',
        price: ''
      },
      bestMacMini:  {
        name: '',
        description: '',
        id: '',
        price: ''
      },
    }
  },
  watch: {
    singleMinScore: 'filterMacsAcrossFilters',
    singleMaxScore: 'filterMacsAcrossFilters',
    minPrice: 'filterMacsAcrossFilters',
    maxPrice: 'filterMacsAcrossFilters',
    multiMinScore: 'filterMacsAcrossFilters',
    multiMaxScore: 'filterMacsAcrossFilters',
    onMarket: 'filterMacsAcrossFilters',
  },

  created() {
    this.loading = true;
    this.macs = this.prepareRatios(datas.macs)
    this.tableItems = this.macs;
    this.bestProduct = this.findBest('')
    this.bestMacbook = this.findBest('macbook')
    this.bestIMac = this.findBest('imac')
    this.bestMacMini = this.findBest('mac mini')
    this.filterMacsAcrossFilters()
    this.sortPerDollarSingle()
    this.loading = false;
  },
  components: {
    MacItem
  },
  methods: {
    geekBenchLink() {
      return 'https://www.geekbench.com/'
    },

    prepareRatios(macs) {
      macs.forEach(mac => {
        mac.multiRatio = mac.multi_score !== 0 || mac.price !==  0 ? ( (mac.multi_score / mac.price).toFixed(2) == Number.POSITIVE_INFINITY || (mac.multi_score / mac.price).toFixed(2) == Number.NAN ? '' : (mac.multi_score / mac.price ).toFixed(2) ) : ''
        mac.singleRatio = mac.single_score !== 0 || mac.price !==  0 ? ( (mac.single_score / mac.price).toFixed(2) == Number.POSITIVE_INFINITY || (mac.single_score / mac.price).toFixed(2) == Number.NAN ? '' : (mac.single_score / mac.price).toFixed(2) ) : ''
      })
      return macs
    },
    
    filterByFieldInt(macs, compareField, low, high) {
      return macs.filter(item => { return (low || 0) <= item[compareField] && item[compareField] <= (high || 1000000) })
    },

    filterMacsAcrossFilters() {
      this.loading = true
      let tempMacArray = this.macs.filter(mac => { return ((this.onMarket && mac.price > 0) || (!this.onMarket && mac.price == 0)) })
      tempMacArray = this.filterByFieldInt(tempMacArray, 'single_score', this.singleMinScore, this.singleMaxScore)
      tempMacArray = this.filterByFieldInt(tempMacArray, 'price', this.minPrice, this.maxPrice)
      tempMacArray = this.filterByFieldInt(tempMacArray, 'multi_score', this.multiMinScore, this.multiMaxScore)
      if(this.nameFilter) {
        tempMacArray = tempMacArray.filter(mac =>  mac.name.toLowerCase().includes(this.nameFilter.toLowerCase()))
      }
      if(this.selectedType && this.selectedType != 'all') {
        tempMacArray = tempMacArray.filter(mac =>  mac.name.toLowerCase().includes(this.selectedType.toLowerCase()))
      }
      this.tableItems = tempMacArray
      this.loading = false
    },

    sortGeneral(sortField) { // use this whenever there is no money related issue
      if(this.sortField == sortField) {
        this.tableItems = this.tableItems.reverse();
      } else {
        this.tableItems = this.tableItems.sort((a,b) => b[sortField] - a[sortField])
        this.sortField = sortField
      }
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
      this.sortField = 'multi_score_per_dolar'
    },

    sortPerDollarSingle() {
      let sorted = this.tableItems.sort((a, b) => {
        let ratio1 = a.single_score !== 0 && a.price !== 0 ? a.single_score / a.price : 0
        let ratio2 = b.single_score !== 0 && b.price !== 0 ? b.single_score / b.price : 0
        return ratio1 < ratio2 ? -1 : ratio1 > ratio2 ? 1 : 0
      })
      if (this.perDFlagS) {
        this.perDFlagS = false
        this.tableItems = sorted.reverse()
      } else {
        this.perDFlagS = true
        this.tableItems = sorted
      }
      this.sortField = 'single_score_per_dolar'
    },

    filterBtn (selectedType) {
      this.selectedType = selectedType
      if(selectedType == 'all') {
        this.nameFilter = ' '  
      } else{
        this.nameFilter = selectedType
      }
      this.filterMacsAcrossFilters()
      this.sortPerDollarSingle()
      this.perDFlagS = true
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
      return {name : macs[0].name, description: macs[0].processor + ' @ ' + (parseFloat(macs[0].processor_freq) / 1000).toFixed(1) + 'Ghz ('+macs[0].processor_cores+ (macs[0].processor_cores == 1 ? ' core) ' :' cores) '), price: macs[0].price, id: macs[0]._id }
    },

    profileLink(id) {
      return `/#/macs/${id}`
    },
  },
}
</script>

<style>
.github {
  position: absolute;
  margin-top: 1%;
  margin-left: 1%;
}
.card-body {
  max-height: 15em;
}
</style>
