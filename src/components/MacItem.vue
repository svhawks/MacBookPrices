<template>
    <table-row class="t-row">
        <table-cel colspan="2" header><router-link :to="profileLink">{{mac.name}}</router-link></table-cel>
        <table-cel  colspan="2" header>{{ mac.processor + ' @ ' + parseFloat(mac.processor_freq / 1000).toFixed(1) 
              + 'Ghz ('+mac.processor_cores+ (mac.processor_cores == 1 ?  ' core) '  :' cores) ') }} </table-cel>
        <table-cel class="score" colspan="1" header>{{mac.single_score}}</table-cel>
        <table-cel class="score" colspan="1" header>{{mac.multi_score}}</table-cel>
        <table-cel class="price" colspan="1" header>${{mac.price}}</table-cel>
        <table-cel class="score" colspan="1" header>{{(mac.multi_score/(mac.price) == 0 ? 1 : mac.price ).toFixed(2) }}</table-cel>
      </table-row>
</template>

<script>
export default {
    name: 'MacItem',
    props: {
        mac: {
            type: Object,
            required: true
        }
    },
    computed: {
        profileLink(){
            return `/macs/${this.mac._id}`
        }
    },
}
</script>

<style scoped >
.score {
    padding-left: 6em;
}
.price { 
    padding-left: 3em;
}
</style>