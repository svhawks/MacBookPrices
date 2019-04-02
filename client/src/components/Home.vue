<template>
  <div class="row">
    <div class="col"></div>
    
    <div class="myTable col-8" v-show="!loading">
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
    <h1 v-show="loading">Macs Are Loading...</h1>
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
          key: 'sS',
          sortable: true,
          label: 'Multi-Core Score'
        },
        {
          key: 'mS',
          sortable: true,
          label: 'Single-Core Score'
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
      macs: []
    }
  },
  created () {
    this.getMacs()
    this.loading = false
  },
  components: {
    MacService
  },
  watch: {
    '$route': 'singleFilter'
  },
  methods: {
    async getMacs () {
      this.loading = true
      const response = await MacService.fetchMacs('/')
      this.fillTable(response.data)
      this.macs = response.data
    },
    fillTable (macs) {
      macs.forEach(mac => {
        this.items.push(
          {
            name: mac.name,
            sS: mac.single_score,
            mS: mac.multi_score,
            description: mac.processor + ' @ ' + parseFloat(mac.processor_freq / 1000).toFixed(1) + ' Ghz (' + mac.processor_cores + ' cores) ',
            Price: mac.price + '$',
            Avarage: parseFloat(mac.single_score / mac.price).toFixed(2)
          })
      })
      this.items.sort((a, b) => (a.sS < b.sS) ? 1 : -1)
    },
    go (name) {
      this.macs.forEach(mac => {
        if (mac.name === name) {
          this.$router.push(`/macs/${mac.id}`)
        }
      })
    },
    clear () {
      this.loading = true
      this.filter = ''
      this.$router.push('/')
      Object.keys(this.filters)
        .map(i => { this.filters[i] = '' })
      this.items = []
      this.fillTable(this.macs)
      this.loading = false
    },
    async singleFilter () {
      this.items = []
      this.loading = true
      const response = await MacService.filterMacs(this.filterUrlBuilder())
      this.fillTable(response.data)
      this.loading = false
    },
    filterRotuer () {
      this.loading = true
      this.$router.push(this.filterUrlBuilder())
      this.loading = false
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

