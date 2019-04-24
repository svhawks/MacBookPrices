<template>
  <table-row class="t-row">
    <table-cel colspan="2" header v-if="mac.price == -1"> <button class="btn-sm btn-primary" @click="removed">-</button> </table-cel>
    <table-cel colspan="2" header v-else> <button class="btn-sm btn-primary" @click="clicked">+</button> </table-cel>
    <table-cel colspan="2" header> <router-link :to="profileLink">{{mac.name}}</router-link> </table-cel>
    <table-cel colspan="2" header>
      {{ mac.processor + ' @ ' + parseFloat(mac.processor_freq / 1000).toFixed(1) + 'Ghz ('+mac.processor_cores+ (mac.processor_cores == 1 ? ' core) ' :' cores) ') }}
    </table-cel>
    <table-cel class="score" colspan="1" header>{{mac.single_score}}</table-cel>
    <table-cel class="score" colspan="1" header>{{mac.multi_score}}</table-cel>
    <table-cel class="price dollar" colspan="1" header v-if="mac.price == -1">$<input type="number" class="form-control input" v-model="price"> </table-cel>
    <table-cel class="price" colspan="1" header v-else >${{mac.price}}</table-cel>
    <table-cel class="score" colspan="1" v-if=" mac.price !== -1" header>{{ ( mac.single_score / mac.price ).toFixed(2) }}</table-cel> 
    <table-cel class="score" colspan="1" v-else header>{{ ratio == Number.POSITIVE_INFINITY ? "" : ratio }}</table-cel> 
    <table-cel class="score" colspan="1" v-if=" mac.price !== -1" header>{{ ( mac.multi_score / mac.price ).toFixed(2) }}</table-cel> 
    <table-cel class="score" colspan="1" v-else header>{{ ratio == Number.POSITIVE_INFINITY ? "" : ratio }}</table-cel> 
  </table-row>
</template>

<script>
export default {
  name: "MacItem",
  props: {
    mac: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      price: "",
      ratio: ""
    }
  },
  watch: {
    price: "calculate"
  },
  computed: {
    profileLink() {
      return `/macs/${this.mac._id}`
    },
    inputListeners () {
      var vm = this
      // `Object.assign` merges objects together to form a new object
      return Object.assign({},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  methods: {
    clicked (event) {
      this.$emit("clicked",this.mac)
    },
    removed (event) {
      this.$emit("removed",this.mac)
    },
    calculate () {
      this.ratio = this.mac.multi_score !== 0 || this.price !== "" ? (this.mac.multi_score / this.price).toFixed(2): 0
    }
  }
}
</script>

<style scoped >
.score {
  text-align: center;
}
.price {
  text-align: center;
}
.dollar {
  display: flex;
  font-size: 130%;
}
.input {
  position:inherit;
  display: flex;
  width: 60%;
  height: 80%;
}
</style>