let express = require("express")
let router = express.Router()
const Sequelize = require("sequelize");
const Mac = require("../models/Mac")
const Op = Sequelize.Op
let qs = require('qs');
let assert = require('assert');
//Get All Macs
router.get("/", (req, res) => {
  let obj = qs.parse(req.params.query)
  let str = qs.stringify(obj);
  console.log("\n\n="+str+"=\n\n")
    Mac.findAll({
      where: {
      }
    })
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
    console.log(mac)
    res.json(mac)
  })
  .catch(err => {
    res.send("error: " + err)
  })
})
router.get("/filtered/", (req, res) => {
  console.log(req.params.query)
  Mac.findAll({
    where: {
      [Op.between]: [{single_score: req.query.min}, {single_score: req.query.max}]
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