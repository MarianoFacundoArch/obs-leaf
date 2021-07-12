const configProvider = require('./modules/config-provider/configProvider')
const express = require('express')

const app = express()
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
