<template>
<div>
  <a @click="homeLink">Back to Home</a>
  <div class="Mytable" v-if="mac != undefined">
    <table class="tg">
      <tr>
        <th class="tg-l98b">Name</th>
        <th class="tg-mlsn">{{mac.name}}</th>
      </tr>
      <tr>
        <td class="tg-ijl4">Model Identifier</td>
        <td class="tg-ijl4">{{mac.model_identifier}}</td>
      </tr>
      <tr>
        <td class="tg-em9h">Processor</td>
        <td class="tg-em9h">{{mac.processor}}</td>
      </tr>
      <tr>
        <td class="tg-ijl4">Processor Frequency</td>
        <td class="tg-ijl4">{{mac.processor_freq}}</td>
      </tr>
      <tr>
        <td class="tg-em9h">Processors</td>
        <td class="tg-em9h">{{mac.processor_count}}</td>
      </tr>
      <tr>
        <td class="tg-ijl4">Processor Cores</td>
        <td class="tg-ijl4">{{mac.processor_cores}}</td>
      </tr>
      <tr>
        <td class="tg-em9h">Processor Threads</td>
        <td class="tg-em9h">{{mac.processor_threads}}</td>
      </tr>
    </table>
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
      console.log(response.data)
      this.mac = response.data
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
<style>
/* eslint-disable */
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
  color: #42b983;
}

.Mytable {
  margin-left: 22%;
}

th, td {
  border-bottom: 1px solid #ddd;
  text-align: left;
  font-size: 200%;
  width: 30%;
}
</style>
