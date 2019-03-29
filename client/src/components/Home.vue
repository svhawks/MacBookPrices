<template>
  <div class="macs-containter">
    <h1>Mac Scores</h1>
    <div v-if="loading">
      <div  v-for="mac in macs" :key="mac.id">
        <macItem :mac=mac>{{mac.id}}</macItem> 
      </div>
    </div>
    <h1 v-else>
      Loading...
    </h1>
  </div>
</template>

<script>
/* eslint-disable */
import MacItem from '@/components/macItem.vue'
import MacService from '@/services/MacService.js'
export default {
  name: 'Home',
  data () {
    return {
      macs: [],
      loading: true
    }
  },
  created () {
    this.getMacs()
    this.loading = true
  },
  components: {
    MacItem,
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
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->

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
</style>
