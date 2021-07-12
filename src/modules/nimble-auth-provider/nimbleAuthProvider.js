const crypto = require('crypto')
const configProvider = require('../config-provider/configProvider')
const salt = Math.floor(Math.random() * 1000000)
const str2hash = salt + '/' + configProvider.NIMBLE_MANAGEMENT_TOKEN
console.log('str to hash: ' + str2hash)
const hash = crypto
    .createHash('md5')
    .update(str2hash, 'binary')
    .digest('base64')

const getNimbleSalt = () => {
    return salt
}

const getNimbleHash = () => {
    return hash
}

module.exports = { getNimbleHash, getNimbleSalt }
