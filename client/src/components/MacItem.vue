<template>
<div>
  <router-link :to="go">
    <h1>{{this.mac.name}}</h1>
  </router-link>
</div>
</template>

<script>
export default {
  name: 'MacItem',
  porps: {
    mac: {
      type: Object,
      required: true
    }
  },
  computed: {
    go (id) {
      return `/macs/${this.mac.id}`
    }
  }
}
</script>


