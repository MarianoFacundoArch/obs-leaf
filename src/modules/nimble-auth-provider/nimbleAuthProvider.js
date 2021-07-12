const md5 = require('md5')
const configProvider = require('../config-provider/configProvider')
const salt = Math.floor(Math.random() * 1000000)
const str2hash = salt + '/' + configProvider.NIMBLE_MANAGEMENT_TOKEN
const hash = new Buffer(md5(str2hash)).toString('base64')

const getNimbleSalt = () => {
    return salt
}

const getNimbleHash = () => {
    return hash
}

module.exports = { getNimbleHash, getNimbleSalt }
