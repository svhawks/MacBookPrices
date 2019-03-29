<template>
<div>
  <router-link v-if="this.mac" :to="go">  
    <h1>Model: {{mac.name}}       Score: {{mac.single_score}}</h1>
  </router-link>
</div>
</template>

<script>
export default {
  name: 'MacItem',
  props: ['mac'],
  computed: {
    go () {
      return `/macs/${this.mac.id}`
    }
  },
  watch: {
    mac: {
      handler: 'created'
    }
  }
}
</script>
