<template>
  <tr role="row" class="even">  
    <td><router-link :to="profileLink">{{mac.name}}</router-link> <div class="text-muted">{{ mac.processor + ' @ ' + (parseFloat(mac.processor_freq) / 1000).toFixed(1) + 'Ghz ('+mac.processor_cores+ (mac.processor_cores == 1 ? ' core) ' :' cores) ')}} </div> </td>
    <td class="text-center">  {{mac.single_score}}</td>
    <td class="text-center">  {{mac.multi_score}}</td>
    <td class="text-center">  ${{mac.price}}</td>
    <td class="text-center">  {{ mac.singleRatio }} </td>
    <td class="text-center">  {{ mac.multiRatio }} </td>
    <td>  <a :href="searchOnAmazonLink(mac.name)" target="_blank" rel="noopener noreferrer"><img src="../../static/images/payments/amazon.svg" alt="" style="max-width: 70px"></a>
      <a href= "https://github.com/svtek/MacScores/blob/master/db.json" target="_blank" rel="noopener noreferrer"> <i class="fe fe-edit-2"></i></a> </td>
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
    searchOnAmazonLink (name) {
      return `https://www.amazon.com/gp/search/ref=as_li_qf_sp_sr_tl?ie=UTF8&tag=sv032-20&keywords=${name}&index=aps&camp=1789&creative=9325&linkCode=ur2&linkId=ad92dd39540fa28645193ae6416b6375`
    }
  }
}
</script>

<style>

</style>
