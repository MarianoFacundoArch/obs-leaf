const express = require('express')
const protectedEndpointAuth = require('../middleware/protectedEndpointAuth')
const { getMaxUsageMedition } = require('../utils/getMaxUsageMedition')
const {
    evaluateIfServerCanReceiveNewStreams,
} = require('../utils/evaluateIfServerCanReceiveNewStreams')
const {
    getLastReportedNimbleStatus,
} = require('../modules/nimble-status-monitor/nimbleStatusMonitor')
const {
    getIsNimbleResponsive,
} = require('../modules/nimble-status-monitor/nimbleStatusMonitor')
const { getLastReadCpuUsage } = require('../modules/cpu-monitor/cpuMonitor')
const {
    getLastReadGpuUsageHighestValue,
} = require('../modules/nvidia-gpu-monitor/nvidiaGpuMonitor')
const router = express.Router()

router.get('/innerTrunk', protectedEndpointAuth, async (req, res) => {
    res.send({
        maxGpuUsage: getLastReadGpuUsageHighestValue(),
        cpuUsage: getLastReadCpuUsage(),
        isNimbleResponsive: getIsNimbleResponsive(),
        lastReportedNimbleStatus: getLastReportedNimbleStatus(),
        serverCanReceiveNewStreams: evaluateIfServerCanReceiveNewStreams(),
        maxUsageMedition: getMaxUsageMedition(),
    })
})

module.exports = router
