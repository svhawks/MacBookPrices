let express = require("express")
let router = express.Router()
const Mac = require("../models/Mac")

//Get All Macs
router.get("/", (req, res) => {
    Mac.findAll()
        .then(macs => {
            console.log(macs)            
            res.json(macs)
        })
        .catch(err => {
            res.send("error: " + err)
        })
})

module.exports = router