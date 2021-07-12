const express = require('express')
const protectedEndpointAuth = require('../middleware/protectedEndpointAuth')
const {
    getLastReadGpuUsageHighestValue,
} = require('../modules/nvidia-gpu-monitor/nvidiaGpuMonitor')
const router = express.Router()

router.get('/innerTrunk', protectedEndpointAuth, async (req, res) => {
    res.send({
        maxGpuUsage: getLastReadGpuUsageHighestValue(),
    })
})

module.exports = router
