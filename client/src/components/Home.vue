<template>
  <div class="row">
    <div class="col"></div>
    
    <div class="myTable col-8">
      <h1>Mac Scores</h1>
      <b-row>
        <b-col md="10" class="my-1">
          <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            </b-input-group>
          </b-form-group>
        <b-form-group label-cols-sm="3" label="Multi Score" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filters.minScore" placeholder="Min"></b-form-input>
            <b-form-input v-model="filters.maxScore" placeholder="Max"></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Single Score" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filters.minMScore" placeholder="Min"></b-form-input>
            <b-form-input v-model="filters.maxMScore" placeholder="Max"></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Price" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filters.minPrice" placeholder="Min"></b-form-input>
            <b-form-input v-model="filters.maxPrice" placeholder="Max"></b-form-input>
          </b-input-group>
        </b-form-group>
        </b-col>
      <b-col md="2">
        <b-button @click="singleFilter" class="btn">Filter</b-button>
        
        <b-button @click="clear" class="btn2">Clear</b-button>
      </b-col>
      </b-row>
      <b-table 
        outlined
        :items="items" 
        :fields="fields"
        :filter="filter"
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
import { log } from 'util';
export default {
  name: 'Home',
  data () {
    return {
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
          sortable: true
        }
      ],
      items: [],
      loading: false,
      filter: null,
      filters: {
        minScore: '',
        maxScore: '',
        minPrice: '',
        maxPrice: '',
        minMScore: '',
        maxMScore: ''
      },
      btns: false,
      macs: [],
      filledFilters: []
    }
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
      this.fillTable(response.rows)
      this.macs = response.rows
    },
    fillTable (macs) {
      macs.forEach(mac => {
        mac = mac.doc
        this.items.push(
          {
            name: mac.name,
            sS: mac.single_score,
            mS: mac.multi_score,
            description: mac.processor + ' @ ' + parseFloat(mac.processor_freq / 1000).toFixed(1) + ' Ghz (' + mac.processor_cores + ' cores) ',
            Price: '$' + mac.price,
            Avarage: parseFloat(mac.single_score / mac.price).toFixed(2)
          })
      })
      this.items.sort((a, b) => (a.sS < b.sS) ? 1 : -1)
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
      this.filter = ''
      Object.keys(this.filters)
        .map(i => { this.filters[i] = '' })
      this.items = []
      this.fillTable(this.macs)
      this.loading = false
    },
    singleFilter () {
      this.loading = true
      Object.keys(this.filters)
        .map(i => { 
          if(this.filters[i].includes('min') && this.filters[i] === ''){
            this.filters[i] = 0
          } 
          if(this.filters[i].includes('max') && this.filters[i] === ''){
            this.filters[i] = Number.MAX_SAFE_INTEGER
          }
        })
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]
        if(item.sS <= this.filters.maxScore && item.mS <= this.filters.maxMScore && item.Price <= this.filters.maxPrice) {
          this.items.pop(item)
        }
        if(item.sS >= this.filters.minScore && item.mS >= this.filters.minMScore && item.Price >= this.filters.minPrice) {
          this.items.pop(item)
        }
     }
      this.loading = false
    }
  }
}
</script>

<style>
h1,
h2 {
  font-weight: 600;
  font-size: 200%;
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
.btn, .btn2 {
  background-color: #42b983;
  border: transparent;
  width: 100px;
  margin-top: 10px;
  padding-left: 30px;
  display: flex;
  text-align: center;
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

