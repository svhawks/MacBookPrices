<template>
  <div class="row">
    <div class="col"></div>
    
    <div class="myTable col-8" v-if="loading">
      <h1>Mac Scores</h1>
      <b-row>
        <b-col md="10" class="my-1">
          <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            </b-input-group>
          </b-form-group>
        <b-form-group label-cols-sm="3" label="Single Score" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filters.minScore" placeholder="Min"></b-form-input>
            <b-form-input v-model="filters.maxScore" placeholder="Max"></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Multi Score" class="mb-0">
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
        <b-button @click="filterRotuer" class="btn">Filter</b-button>
        
        <b-button @click="clear" class="btn2">Clear</b-button>
      </b-col>
      </b-row>
      
      <b-table 
        outlined
        :items="items" 
        :fields="fields"
        :filter="filter"
      >
        <template slot="name" slot-scope="data" >
          <a @click='go(data.value)'>{{ data.value }}</a>
        </template>
      </b-table>
    </div>
    <h1 v-else>
      Loading...
    </h1>
    <div class="col"></div>
  </div>
</template>

<script>
import MacService from '@/services/MacService.js'
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
          key: 'Single-Core Score',
          sortable: true
        },
        {
          key: 'Multi-Core Score',
          sortable: true
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
      loading: true,
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
      macs: []
    }
  },
  created () {
    this.getMacs()
    this.loading = true
  },
  components: {
    MacService
  },
  watch: {
    '$route': 'singleFilter',
    'clear': 'getMacs'
  },
  methods: {
    async getMacs () {
      this.loading = false
      const response = await MacService.fetchMacs('/')
      this.fillTable(response.data)
      this.macs = response.data
    },
    fillTable (macs) {
      macs.forEach(mac => {
        this.items.push(
          {
            name: mac.name,
            'Single-Core Score': mac.single_score,
            'Multi-Core Score': mac.multi_score,
            description: mac.processor + ' @ ' + parseFloat(mac.processor_freq / 1000).toFixed(1) + ' Ghz (' + mac.processor_cores + ' cores) ',
            Price: mac.price + '$',
            Avarage: parseFloat(mac.multi_score / mac.price).toFixed(2)
          })
      })
    },
    go (name) {
      let id = 0
      this.macs.forEach(mac => {
        id++
        if (mac.name === name) {
          this.$router.push(`/macs/${id}`)
        }
      })
    },
    clear () {
      this.filter = ''
      Object.keys(this.filters)
        .map(i => { this.filters[i] = '' })
      this.items = []
      this.fillTable(this.macs)
    },
    async singleFilter () {
      this.items = []
      this.loading = false
      const response = await MacService.filterMacs(this.filterUrlBuilder())
      this.fillTable(response.data)
      this.loading = true
    },
    filterRotuer () {
      this.$router.push(this.filterUrlBuilder())
    },
    filterUrlBuilder () {
      let url = '/filtered/?'
      let esc = encodeURIComponent
      url += Object.keys(this.filters)
        .map(i => esc(i) + '=' + esc(this.filters[i]))
        .join('&')
      return url
    }
  }
}
</script>

<style>
h1,
h2 {
  font-weight: 600;
  font-size: 350%;
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
  font-size: 130%;
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
  padding-top: 4px;
}

</style>

