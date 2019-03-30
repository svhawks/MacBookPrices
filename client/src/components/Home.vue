<template>
  <div class="macs-containter">
    <h1>Mac Scores</h1>
    <div class="myTable" v-if="loading">
      <b-row>
        <b-col md="10" class="my-1">
          <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            </b-input-group>
          </b-form-group>
        <b-form-group label-cols-sm="3" label="Score" class="mb-0">
          <b-input-group>
            <b-form-input v-model="minScore" placeholder="Min"></b-form-input>
            <b-form-input v-model="maxScore" placeholder="Max"></b-form-input>
          </b-input-group>
        </b-form-group>
        </b-col>
      <b-col md="2">
        <b-button :disabled="!minScore && !maxScore" @click="filterRotuer" class="btn">Filter</b-button>
        <br>
        <b-button :disabled="!filter && !minScore && !maxScore" @click="clear" class="btn">Clear</b-button>
      </b-col>
      </b-row>
      
      <b-table 
        outlined
        hover
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
          key: 'SingleScore',
          sortable: true
        },
        {
          key: 'MultiScore',
          sortable: true
        }
      ],
      items: [],
      loading: true,
      filter: null,
      minScore: null,
      maxScore: null,
      getbtn: false
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
    'getBtn': 'singleFilter'
  },
  methods: {
    async getMacs () {
      this.loading = false
      const response = await MacService.fetchMacs('/')
      this.fillTable(response.data)
    },
    fillTable (macs) {
      macs.forEach(mac => {
        this.items.push(
          {
            name: mac.name,
            SingleScore: mac.single_score,
            MultiScore: mac.multi_score,
            description: mac.processor + ' @ ' + parseFloat(mac.processor_freq / 1000).toFixed(1) + ' Ghz (' + mac.processor_cores + ' cores) '
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
      this.minScore = ''
      this.maxScore = ''
      this.filter = ''
    },
    async singleFilter () {
      this.items = []
      this.loading = false
      const response = await MacService.fetchMacs(`/?min=${this.minScore}&max=${this.maxScore}`)
      this.fillTable(response.data)
      this.loading = true
    },
    filterRotuer () {
      this.getbtn = true
      this.$router.push(`/?min=${this.minScore}&max=${this.maxScore}`)
    }
  }
}
</script>

<style>
/* eslint-disable */
h1,
h2 {
  font-weight: 900;
  font-size: 400%;
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
  width: 50%;
  margin-left: 25%;
  margin-top: 5%;
}

thead {
  background-color: slateblue; 
  color: aliceblue;
}

th, td{
  height: 20%;
  font-size: 150%;
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
.btn {
  background-color: #42b983;
  border: transparent;
  width: 100px;
  margin-top: 2px;
  padding: 8px;
}

</style>

