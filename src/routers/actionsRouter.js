const express = require('express')
const protectedEndpointAuth = require('../middleware/protectedEndpointAuth')
const logger = require('../modules/logger/logger')
const {
    getAntMediaServiceInformation,
} = require('../modules/antmedia-service-manager/antMediaServiceManager')
const {
    resetAntMedia,
} = require('../modules/antmedia-service-manager/antMediaServiceManager')

const router = express.Router()

router.get('/actions/restartNimble', protectedEndpointAuth, (req, res) => {
    resetAntMedia()
        .then(() => {
            res.send({ success: true })
        })
        .catch((err) => {
            res.status(500).send({ err: true, desc: err.toString() })
        })
})

router.get(
    '/actions/getAntMediaServiceInformation',
    protectedEndpointAuth,
    (req, res) => {
        getAntMediaServiceInformation()
            .then((response) => {
                res.send({ result: response })
            })
            .catch((err) => {
                res.status(500).send({ err: true, desc: err.toString() })
            })
    }
)

module.exports = router
