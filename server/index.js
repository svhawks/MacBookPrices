var express = require("express")
var bodyParser = require("body-parser")

var macs = require("./routes/macs")
var cors = require("cors")

var port = 5000

var app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api", macs)

app.listen(port, function () {
    console.log('Server started on port ' + port)
})