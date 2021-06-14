const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

const mongoose = require('mongoose')
const uri = "mongodb+srv://test_user:test_password@cluster0.vwzh7.mongodb.net/ddb1?retryWrites=true&w=majority"
mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', ()=> console.log('Connected to Database'))

const PORT = 8000
const apiRoutes = require('./routes/routes_handling')

app.use(express.json())
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    if(req.body.name){
        res.send(`Hello, ${req.body.name}`)
    }else{
        res.send(`Hello, this is base`)
    }
})

app.listen(PORT, ()=> console.log("Server Started"))