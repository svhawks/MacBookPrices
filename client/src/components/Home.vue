<template>
  <div class="macs-containter">
    <h1>Mac Scores</h1>
    <div class="myTable" v-if="loading">
      <b-table 
        outlined
        hover
        :items="items" 
        :fields="fields"
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
          key: 'score',
          sortable: true
        }
      ],
      macs: [],
      items: [],
      loading: true
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
    '$route': 'getMacs'
  },
  methods: {
    async getMacs () {
      this.loading = false
      const response = await MacService.fetchMacs()
      this.macs = response.data
      this.fillTable()
    },
    fillTable () {
      this.macs.forEach(mac => {
        this.items.push(
          {
            name: mac.name,
            score: mac.single_score,
            description: mac.processor + ' @ ' + parseFloat(mac.processor_freq / 1000).toFixed(1) + ' Ghz (' + mac.processor_cores + ' cores) '
          })
      })
    },
    go (name) {
      let id = 0
      this.macs.forEach(mac => {
        id++
        if (mac.name === name) {
          console.log(name)
          this.$router.push(`/macs/${id}`)
        }
      })
    }
  }
}
</script>

<style>
/* eslint-disable */
h1,
h2 {
  font-weight: normal;
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

a {
  color: #42b983;
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
</style>

