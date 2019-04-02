let express = require("express")
let router = express.Router()
const Sequelize = require("sequelize");
const Mac = require("../models/Mac")
const Op = Sequelize.Op
let qs = require('qs');
let assert = require('assert');

//Get All Macs
router.get("/", (req, res) => {
  Mac.findAll({order: Sequelize.col('single_score','DESC')})
  .then(macs => {     
    res.json(macs)
  })
  .catch(err => {
    res.send("error: " + err)
  })
})

//Get Mac With Id
router.get("/macs/:id", (req, res) => {
  Mac.findOne({ where: {id: req.params.id} })
  .then(mac => {     
    res.json(mac)
  })
  .catch(err => {
    res.send("error: " + err)
  })
})

// Get Filtered Macs
router.get("/filtered/", (req, res) => {
  let obj = qs.parse(req.query)
  let str = qs.stringify(obj);
  let temp = str.split('&')
  let singleMin = temp[0].split('=')[1] ==='' ? 0 : temp[0].split('=')[1]
  let singleMax = temp[1].split('=')[1] ==='' ? Number.MAX_SAFE_INTEGER : temp[1].split('=')[1]
  let priceMin = temp[2].split('=')[1] ==='' ? 0 : temp[2].split('=')[1]
  let priceMax = temp[3].split('=')[1] ==='' ? Number.MAX_SAFE_INTEGER : temp[3].split('=')[1]
  let multiMin = temp[4].split('=')[1] ==='' ? 0 : temp[4].split('=')[1]
  let multiMax = temp[5].split('=')[1] ==='' ? Number.MAX_SAFE_INTEGER : temp[5].split('=')[1]
  Mac.findAll({
    where: {
      single_score: {
        [Op.and]:{
          [Op.gte]: singleMin,
          [Op.lte]: singleMax
        }
      },
      multi_score: {
        [Op.and]:{
          [Op.gte]: multiMin,
          [Op.lte]: multiMax
        }
      },
      price: {
        [Op.and]:{
          [Op.gte]: priceMin,
          [Op.lte]: priceMax
        }
      }
    }
  })
  .then(macs => {   
    console.log(macs)
    res.json(macs)
  })
  .catch(err => {
    res.send("error: " + err)
  })
})
module.exports = router