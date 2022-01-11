const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
const job = require('./cron/index.js')

app.use(cors())
app.use(express.json({extended:false}))
app.use(helmet())
app.use(morgan('dev'))

app.use('/api/list',require('./routes/list'))
app.use('/api/convert',require('./routes/convert'))
app.use('/api/refresh',require('./routes/refresh'))
job();

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>  console.log(`server started on port ${PORT}`))