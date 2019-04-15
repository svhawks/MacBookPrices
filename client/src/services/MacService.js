import PouchDB from 'pouchdb'
import find from "pouchdb-find"
PouchDB.plugin(find)
const db = new PouchDB('mac_scores')


export default {
  fetchMacs () {
    return db.allDocs({ include_docs: true })
  },
  fetchMacById (id) {
    return db.get(`${id}`) 
  },
  filterMacs(filters) {
    console.log(filters);
    
    return db.createIndex({
      index: {
        fields: ['single_score', 'multi_score','price'] }
    }).then( () => {
      return db.find({
        selector: {
          single_score: {
            $gte: filters.minScore
          },
          single_score: {
            $lte: filters.maxScore
          },
          multi_score: {
            $gte: filters.minMScore
          },
          multi_score: {
            $lte: filters.maxMScore
          },
          price: {
            $gte: filters.minPrice
          },
          price: {
            $lte: filters.maxPrice
          }
        }
      })
    })
  }
}
