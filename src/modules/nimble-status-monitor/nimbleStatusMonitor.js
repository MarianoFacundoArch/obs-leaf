const axios = require('axios')
const configProvider = require('../config-provider/configProvider')
const { getNimbleHash } = require('../nimble-auth-provider/nimbleAuthProvider')
const { getNimbleSalt } = require('../nimble-auth-provider/nimbleAuthProvider')
const trackNimbleStatus = () => {
    axios
        .get(
            `http://localhost:${configProvider.NIMBLE_MANAGEMENT_PORT}/manage/server_status`,
            {
                params: { salt: getNimbleSalt(), hash: getNimbleHash() },
            }
        )
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = { trackNimbleStatus }
