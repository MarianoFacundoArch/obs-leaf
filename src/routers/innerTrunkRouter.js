const express = require('express')
const protectedEndpointAuth = require('../middleware/protectedEndpointAuth')
const { getLastReadCpuUsage } = require('../modules/cpu-monitor/cpuMonitor')
const {
    getLastReadGpuUsageHighestValue,
} = require('../modules/nvidia-gpu-monitor/nvidiaGpuMonitor')
const router = express.Router()

router.get('/innerTrunk', protectedEndpointAuth, async (req, res) => {
    res.send({
        maxGpuUsage: getLastReadGpuUsageHighestValue(),
        cpuUsage: getLastReadCpuUsage(),
    })
})

module.exports = router
