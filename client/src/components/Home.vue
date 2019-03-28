<template>
  <div class="macs-containter">
    <h1>hello</h1>
    <div v-for="mac in macs">
      <MacItem :mac = mac ></MacItem>
    </div>
  </div>
</template>

<script>
import MacItem from '@/components/macItem.vue'
import MacService from '@/services/MacService.js'
export default {
  name: 'Home',
  data () {
    return {
      macs: []
    }
  },
  created () {
    this.getMacs()
  },
  components: {
    MacItem,
    MacService
  },
  methods: {
    async getMacs () {
      const response = await MacService.fetchMacs()
      this.macs = response.data
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->

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
  color: #42b983;
}
</style>
