<template>
  <tr role="row" class="even">  
    <td><router-link title="Info About This Mac" :to="profileLink">{{mac.name}}</router-link> <div class="text-muted">{{ mac.processor + ' @ ' + (parseFloat(mac.processor_freq) / 1000).toFixed(1) + 'Ghz ('+mac.processor_cores+ (mac.processor_cores == 1 ? ' core) ' :' cores) ')}} </div> </td>
    <td class="text-center">  <a :href="geekBenchLink(mac._id)" title="GeekBench.com"> {{mac.single_score}} </a> </td>
    <td class="text-center"> <a :href="geekBenchLink(mac._id)" title="GeekBench.com"> {{mac.multi_score}} </a> </td>
    <td class="text-center">  ${{mac.price}}</td>
    <td class="text-center">  {{ mac.singleRatio }} </td>
    <td class="text-center">  {{ mac.multiRatio }} </td>
    <td>  <a :href="searchOnAmazonLink(mac.name)" target="_blank" title="Buy On Amazon" rel="noopener noreferrer"><img src="https://ya-webdesign.com/images/buy-on-amazon-png-3.png" alt="" style="max-width: 100px"></a> &nbsp &nbsp
      <a href= "https://github.com/svtek/MacScores/blob/master/db.json" target="_blank" title="Help Us To Improve Our Data" rel="noopener noreferrer"> Edit<i class="fe fe-edit-2"></i></a> </td>
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
     geekBenchLink (id) {
      return `https://browser.geekbench.com/macs/${id}`
    },
    searchOnAmazonLink (name) {
      name = name.replace('(','')
      name = name.replace(')','')
      return `https://www.amazon.com/gp/search/ref=as_li_qf_sp_sr_tl?ie=UTF8&tag=sv032-20&keywords=${name}&index=aps&camp=1789&creative=9325&linkCode=ur2&linkId=ad92dd39540fa28645193ae6416b6375`
    }
  }
}
</script>

<style>

</style>
