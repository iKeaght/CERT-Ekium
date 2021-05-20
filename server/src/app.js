console.log('hello')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')


const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
var corsOptions = {
    origin: "http://localhost:8080"
  };
app.use(cors(corsOptions))

require('./routes')(app)

sequelize.sync()//{force: true} pour tout delete
.then(()=>{
    app.listen(config.port)
    console.log(`server started on port ${config.port}`)
})
