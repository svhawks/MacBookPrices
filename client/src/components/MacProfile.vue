<template>
<div>
  <div class="row">
    <div class="col"></div>
    <div class="col-4">
      <h1 v-if="mac != undefined">{{mac.name}}</h1>
    </div>
    <div class="col"></div>
  </div>
  <div class="row">
    <div class="col">

    </div>
    <div class="Mytable col-4" v-if="mac != undefined">
      <table class="tg">
        <tr>
          <td class="tg-em9h">Single-Core Score</td>
          <th>:</th>
          <th class="tg-em9h">{{mac.single_score}}</th>
        </tr>
        <tr>
          <td class="tg-em9h">Multi-Core Score</td>
          <th>:</th>
          <th class="tg-em9h">{{mac.multi_score}}</th>
        </tr>
        <tr>
          <td class="tg-l98b">Name</td>
          <th>:</th>
          <th class="tg-mlsn">{{mac.name}}</th>
        </tr>
        <tr>
          <td class="tg-ijl4">Model Identifier</td>
          <th>:</th>
          <th class="tg-ijl4">{{mac.model_identifier}}</th>
        </tr>
        <tr>
          <td class="tg-em9h">Processor</td>
          <th>:</th>
          <th class="tg-em9h">{{mac.processor}}</th>
        </tr>
        <tr>
          <td class="tg-ijl4">Processor Frequency</td>
          <th>:</th>
          <th class="tg-ijl4">{{mac.processor_freq}} Mhz</th>
        </tr>
        <tr>
          <td class="tg-em9h">Processors</td>
          <th>:</th>
          <th class="tg-em9h">{{mac.processor_count}}</th>
        </tr>
        <tr>
          <td class="tg-ijl4">Processor Cores</td>
          <th>:</th>
          <th class="tg-ijl4">{{mac.processor_cores}}</th>
        </tr>
        <tr>
          <td class="tg-em9h">Processor Threads</td>
          <th>:</th>
          <th class="tg-em9h">{{mac.processor_threads}}</th>
        </tr>
        <tr>
          <td class="tg-em9h">Price</td>
          <th>:</th>
          <th class="tg-em9h"> ${{mac.price}} </th>
        </tr>
        <tr>
          <td class="tg-em9h">Avarage</td>
          <th>:</th>
          <th class="tg-em9h">{{parseFloat(mac.multi_score / mac.price).toFixed(2)}}</th>
        </tr>
      </table>
    </div>
    <div class="col">
    </div>
    
  </div>
  <div class="row">
    <div class="col"></div>
    <div class="col-6">
      <h1><a @click="homeLink">Back to Home</a></h1>
    </div>
    <div class="col"></div>
  </div>
  
</div>
</template>

<script>
import MacService from '@/services/MacService.js'
export default {
  name: 'MacProfile',
  data () {
    return {
      mac: null
    }
  },
  created () {
    this.getMac()
  },
  watch: {
    '$route': 'getMac'
  },
  methods: {
    async getMac () {
      const response = await MacService.fetchMacById(this.$route.params.id)    
      this.mac = response
    },
    homeLink () {
      this.$router.push({name: 'home'})
    }
  },
  components: {
    MacService
  }
}
</script>
<style scoped>
h1,
h2 {
  font-weight: normal;
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
  font-size: xx-large;
  font-weight: 900;
  color: #42b983;
}
th {
  text-align: right;
}

th, td {
  border-bottom: 2px solid #ddd;
  border-top: 2px solid #ddd;
  font-size: 125%;
}
td {
  text-align: left;
}
tr:hover {
  background-color: slateblue;
  color: #ddd;
}
.Mytable {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
