<template>
  <tr role="row" class="even">  
    <td class="text-pre"><router-link title="Info About This Mac" :to="profileLink">{{mac.name}}</router-link> <div class="text-muted">{{ mac.processor + ' @ ' + (parseFloat(mac.processor_freq) / 1000).toFixed(1) + 'Ghz ('+mac.processor_cores+ (mac.processor_cores == 1 ? ' core) ' :' cores) ')}} </div> </td>
    <td class="text-center">  <a :href="geekBenchLink(mac._id)" target="_blank" title="GeekBench.com"> {{mac.single_score}} </a> </td>
    <td class="text-center"> <a :href="geekBenchLink(mac._id)"  target="_blank" title="GeekBench.com"> {{mac.multi_score}} </a> </td>
    <td class="text-center">  ${{mac.price}}</td>
    <td class="text-center">  {{ mac.singleRatio }} </td>
    <td class="text-center">  {{ mac.multiRatio }} </td>
    <td class="text-center">  
      <a target="_blank" :href="searchOnAmazonLink(mac.name)">Buy Now</a>
      <img src="//ir-na.amazon-adsystem.com/e/ir?t=sv0f7-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
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
      let name = this.mac.name
      name = name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")
      return `/macs/${name}${this.mac._id}`
    }
  },
  methods: {
     geekBenchLink (id) {
      return `https://browser.geekbench.com/macs/${id}`
    },
    searchOnAmazonLink (name) {
      name = name.replace('(','')
      name = name.replace(')','')
      return `https://www.amazon.com/gp/search?ie=UTF8&tag=sv0f7-20&linkCode=ur2&linkId=37c3e184b077b7359fcd3143e2deaaaa&camp=1789&creative=9325&index=pc-hardware&keywords=${name}`
    }
  }
}
</script>

<style>

</style>
