const axios = require('axios')
const configProvider = require('../config-provider/configProvider')
const logger = require('../logger/logger')
const { getNimbleHash } = require('../nimble-auth-provider/nimbleAuthProvider')
const { getNimbleSalt } = require('../nimble-auth-provider/nimbleAuthProvider')

let isNimbleResponsive = false
let lastReportedNimbleStatus

const getIsNimbleResponsive = () => {
    return isNimbleResponsive
}

const getLastReportedNimbleStatus = () => {
    return lastReportedNimbleStatus
}
const trackNimbleStatus = () => {
    axios
        .get(
            `http://localhost:${
                configProvider.NIMBLE_MANAGEMENT_PORT
            }/manage/server_status?salt=${getNimbleSalt()}&hash=${getNimbleHash()}`
        )
        .then((res) => {
            isNimbleResponsive = true
            lastReportedNimbleStatus = res.data
        })
        .catch((err) => {
            lastReportedNimbleStatus = null
            isNimbleResponsive = false
            logger.error('Error on trackNimbleStatus: ' + err.toString())
        })
}

module.exports = {
    trackNimbleStatus,
    getIsNimbleResponsive,
    getLastReportedNimbleStatus,
}
