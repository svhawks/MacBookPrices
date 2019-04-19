<template>
    <table-row class="t-row">
        <table-cel colspan="2" header><router-link :to="profileLink">{{mac.doc.name}}</router-link></table-cel>
        <table-cel  colspan="2" header>{{ mac.doc.processor + ' @ ' + parseFloat(mac.doc.processor_freq / 1000).toFixed(1) 
              + 'Ghz ('+mac.doc.processor_cores+ (mac.doc.processor_cores == 1 ?  ' core) '  :' cores) ') }} </table-cel>
        <table-cel class="score" colspan="1" header>{{mac.doc.single_score}}</table-cel>
        <table-cel class="score" colspan="1" header>{{mac.doc.multi_score}}</table-cel>
        <table-cel colspan="1" header>${{mac.doc.price}}</table-cel>
        <table-cel class="score" colspan="1" header>{{(mac.doc.multi_score/(mac.doc.price) == 0 ? 1 : mac.doc.price ).toFixed(2) }}</table-cel>
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
            return `/macs/${this.mac.id}`
        }
    },
}
</script>

<style scoped >
.score {
    padding-left: 6em;
}
</style>