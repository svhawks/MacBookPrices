<template>
<div>
  <a @click="homeLink">Back to Home</a>
  <div class="Mytable" v-if="mac != undefined">
    <table class="tg">
      <tr>
        <td class="tg-l98b">Name</td>
        <th>:</th>
        <td class="tg-mlsn">{{mac.name}}</td>
      </tr>
      <tr>
        <td class="tg-ijl4">Model Identifier</td>
        <th>:</th>
        <td class="tg-ijl4">{{mac.model_identifier}}</td>
      </tr>
      <tr>
        <td class="tg-em9h">Processor</td>
        <th>:</th>
        <td class="tg-em9h">{{mac.processor}}</td>
      </tr>
      <tr>
        <td class="tg-ijl4">Processor Frequency</td>
        <th>:</th>
        <td class="tg-ijl4">{{mac.processor_freq}}</td>
      </tr>
      <tr>
        <td class="tg-em9h">Processors</td>
        <th>:</th>
        <td class="tg-em9h">{{mac.processor_count}}</td>
      </tr>
      <tr>
        <td class="tg-ijl4">Processor Cores</td>
        <th>:</th>
        <td class="tg-ijl4">{{mac.processor_cores}}</td>
      </tr>
      <tr>
        <td class="tg-em9h">Processor Threads</td>
        <th>:</th>
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
<style scoped>
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
  margin-left: 25%;
}

th, td {
  border-bottom: 1px solid #ddd;
  font-size: 200%;
}
td {
  text-align: left;
  width: 25%;
}
</style>
