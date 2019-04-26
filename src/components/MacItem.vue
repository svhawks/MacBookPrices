<template>
  <table-row class="t-row">
    <table-cel colspan="2" header> <router-link :to="profileLink">{{mac.name}}</router-link> </table-cel>
    <table-cel colspan="2" header>
      {{ mac.processor + ' @ ' + (parseFloat(mac.processor_freq) / 1000).toFixed(1) + 'Ghz ('+mac.processor_cores+ (mac.processor_cores == 1 ? ' core) ' :' cores) ') }}
    </table-cel>
    <table-cel class="score" colspan="1" header>{{mac.single_score}}</table-cel>
    <table-cel class="score" colspan="1" header>{{mac.multi_score}}</table-cel>
    <table-cel class="price dollar" colspan="1" header v-if="mac.price == -1">$<input type="number" class="form-control input" v-model="price"> </table-cel>
    <table-cel class="price" colspan="1" header v-else >${{mac.price}}</table-cel>
    <table-cel class="score" colspan="1" v-if=" mac.price !== -1" header>{{ mac.multi_score / mac.price   == Number.POSITIVE_INFINITY ? '' : ( mac.single_score / mac.price ).toFixed(2) }}</table-cel> 
    <table-cel class="score" colspan="1" v-else header>{{ singleRatio }}</table-cel> 
    <table-cel class="score" colspan="1" v-if=" mac.price !== -1" header>{{  mac.single_score / mac.price   == Number.POSITIVE_INFINITY ? '' : ( mac.single_score / mac.price ).toFixed(2) }}</table-cel> 
    <table-cel class="score" colspan="1" v-else header>{{ multiRatio }}</table-cel> 
    <table-cel class="score" colspan="1" header> <a :href="searchOnAmazonLink(mac.name)" target="_blank" rel="noopener noreferrer"><button class="btn"> <img src="../../static/images/payments/amazon.svg" alt=""></button></a> </table-cel>
    <table-cel class="score" colspan="1" header> <a href= "https://github.com/svtek/MacScores/blob/master/db.json" target="_blank" rel="noopener noreferrer"><button class="btn"> <img src="https://i.ibb.co/MCYbxqK/Git-Hub-Mark-64px.png" alt=""></button></a> </table-cel>
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
      price: '',
      multiRatio: '',
      singleRatio: '',
      link: ''
    }
  },
  watch: {
    'price': "calculate"
  },
  computed: {
    profileLink() {
      return `/macs/${this.mac._id}`
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
      this.multiRatio = this.mac.multi_score !== 0 || this.price !==  '' ? ( (this.mac.multi_score / this.price).toFixed(2) == Number.POSITIVE_INFINITY ? '' : (this.mac.multi_score / this.price).toFixed(2) ) : ''
      this.singleRatio = this.mac.single_score !== 0 || this.price !==  '' ? ( (this.mac.single_score / this.price).toFixed(2) == Number.POSITIVE_INFINITY ? '' : (this.mac.single_score / this.price).toFixed(2) ) : ''
    },
    searchOnAmazonLink (name) {
      return `https://www.amazon.com/s?k=${name}`
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