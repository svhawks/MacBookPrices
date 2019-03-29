let express = require("express")
let router = express.Router()
const Mac = require("../models/Mac")

//Get All Macs
router.get("/", (req, res) => {
    Mac.findAll()
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
module.exports = router