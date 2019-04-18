<template>
  <div class="row">
    <div class="col"></div>
    
    <div class="myTable col-8">
      <h1>Mac Scores</h1>
      <b-row>
        <b-col md="10" class="my-1">
          <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="nameFilter" placeholder="Type to Search"></b-form-input>
            </b-input-group>
          </b-form-group>
        <b-form-group label-cols-sm="3" label="Single Score" class="mb-0">
          <b-input-group>
            <b-form-input  type="number" v-model="singleMinScore" placeholder="Min"></b-form-input>
            <b-form-input type="number" v-model="singleMaxScore" placeholder="Max"></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Multi Score" class="mb-0">
          <b-input-group>
            <b-form-input type="number"  v-model="multiMinScore" placeholder="Min"></b-form-input>
            <b-form-input type="number"  v-model="multiMaxScore" placeholder="Max"></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Price" class="mb-0">
          <b-input-group>
            <b-form-input type="number"  v-model="minPrice" placeholder="Min"></b-form-input>
            <b-form-input type="number"  v-model="maxPrice" placeholder="Max"></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-button @click="clear" class="btn2">Clear</b-button>        
      </b-col>
      </b-row>
      <b-table 
        outlined
        :items="items" 
        :fields="fields"
        :busy='loading'
      >
        <template slot="name" slot-scope="data" >
          <a @click='go(data.item.description)'>{{ data.value }}</a>
        </template>
      </b-table>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import MacService from '@/services/MacService.js'
export default {
  name: 'Home',
  data () {
    return {
      types: [
          'text',
          'number'
        ],
      fields: [
        {
          key: 'name',
          sortable: false
        },
        {
          key: 'description',
          sortable: false
        },
        {
          key: 'sS',
          sortable: true,
          label: 'Single-Core Score'
        },
        {
          key: 'mS',
          sortable: true,
          label: 'Multi-Core Score'
        },
        {
          key: 'Price',
          sortable: true
        },
        {
          key: 'Avarage',
          sortable: true,
          label: 'Multi-score per $'
        }
      ],
      items: [],
      loading: false,
      nameFilter: '',
      singleMinScore: '',
      singleMaxScore: '',
      minPrice: '',
      maxPrice: '',
      multiMinScore: '',
      multiMaxScore: '',
      btns: false,
      macs: [],
      filteredMacs: [],
      selectedFilters: []
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
    MacService
  },
  methods: {
    async getMacs () {
      const response = await MacService.fetchMacs()
      //const response = await MacService.updateDB()
      this.fillTable(response.rows)
      this.macs = response.rows
    },
    fillTable (macs) {
      macs.forEach(mac => {
        mac = mac.doc == null ? mac : mac.doc
        this.items.push(
          {
            name: mac.name,
            sS: mac.single_score,
            mS: mac.multi_score,
            description: mac.processor + ' @ ' + parseFloat(mac.processor_freq / 1000).toFixed(1) + ' Ghz (' + mac.processor_cores + ' cores) ',
            Price: '$' + mac.price,
            Avarage: mac.multi_score === 0 ? 0 : parseFloat(mac.multi_score / mac.price).toFixed(2)
          })
      })
      this.items.sort((a, b) => (a.Avarage < b.Avarage) ? 1 : -1)
    },
    go (description) {
      this.macs.forEach(mac => {
        mac = mac.doc     
        let desc = mac.processor + ' @ ' + parseFloat(mac.processor_freq / 1000).toFixed(1) + ' Ghz (' + mac.processor_cores + ' cores) '
        if (desc === description) {
          this.$router.push(`/macs/${mac._id}`)
        }
      })
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
      this.items = []
      this.fillTable(this.macs)
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
      this.items = []            
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
h1,
h2 {
  font-weight: 600;
  font-size: 300%;
  color:slateblue;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}


.myTable {
  font-weight: 800;
}

thead {
  background-color: slateblue; 
  color: aliceblue;
  text-align: center;
}
tr:hover {
  background-color: slateblue; 
  color: aliceblue;
}
th, td{
  height: 15%;
  font-size: 100%;
  text-decoration: none;
}

a:not([href]):not([tabindex]) {
  color: #42b983;
  cursor: pointer;
}
a:not([href]):not([tabindex]):hover {
  text-decoration-line: underline;
    color: #42b983;
}
.btn2 {
  background-color: #42b983;
  border: transparent;
  width: 75%;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 25%
}
.form-row {
  padding-top: 2px;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}


</style>

