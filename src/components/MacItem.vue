<template>
  <tr role="row" class="even">  
    <td><router-link :to="profileLink">{{mac.name}}</router-link> </td>
    <td>  {{ mac.processor + ' @ ' + (parseFloat(mac.processor_freq) / 1000).toFixed(1) + 'Ghz ('+mac.processor_cores+ (mac.processor_cores == 1 ? ' core) ' :' cores) ') }}</td>
    <td>  {{mac.single_score}}</td>
    <td>  {{mac.multi_score}}</td>
    <td>  ${{mac.price}}</td>
    <td>  {{ singleRatio }} </td>
    <td>  {{ multiRatio }} </td>
    <td>  <a :href="searchOnAmazonLink(mac.name)" target="_blank" rel="noopener noreferrer"><button class="btn"> <img src="../../static/images/payments/amazon.svg" alt=""></button></a> </td>
    <td>  <a href= "https://github.com/svtek/MacScores/blob/master/db.json" target="_blank" rel="noopener noreferrer"><button class="btn"> <img src="https://i.ibb.co/MCYbxqK/Git-Hub-Mark-64px.png" alt=""></button></a> </td>
  </tr>
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
    calculate () {
      this.multiRatio = this.mac.multi_score !== 0 || this.price !==  '' ? ( (this.mac.multi_score / this.price).toFixed(2) == Number.POSITIVE_INFINITY ? '' : (this.mac.multi_score / this.price).toFixed(2) ) : ''
      this.singleRatio = this.mac.single_score !== 0 || this.price !==  '' ? ( (this.mac.single_score / this.price).toFixed(2) == Number.POSITIVE_INFINITY ? '' : (this.mac.single_score / this.price).toFixed(2) ) : ''
    },
    searchOnAmazonLink (name) {
      return `https://www.amazon.com/gp/search/ref=as_li_qf_sp_sr_tl?ie=UTF8&tag=sv032-20&keywords={${name}}&index=aps&camp=1789&creative=9325&linkCode=ur2&linkId=ad92dd39540fa28645193ae6416b6375`
    }
  }
}
</script>

<style>

</style>