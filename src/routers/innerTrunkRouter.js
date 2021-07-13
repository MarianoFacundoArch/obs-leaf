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
const configProvider = require('../modules/config-provider/configProvider')
const {
    getLocalRtmpStreams,
} = require('../modules/streams-monitor/streamsMonitor')
const {
    getIsGpuPresent,
} = require('../modules/nvidia-gpu-monitor/nvidiaGpuMonitor')
router.get('/innerTrunk', protectedEndpointAuth, async (req, res) => {
    res.send({
        maxGpuUsage: getLastReadGpuUsageHighestValue(),
        cpuUsage: getLastReadCpuUsage(),
        hasGpu: await getIsGpuPresent(),
        isNimbleResponsive: getIsNimbleResponsive(),
        lastReportedNimbleStatus: getLastReportedNimbleStatus(),
        serverCanReceiveNewStreams: evaluateIfServerCanReceiveNewStreams(),
        maxUsageMedition: getMaxUsageMedition(),
        serverTags: configProvider.SERVER_TAGS,
        isBackupServer: configProvider.IS_BACKUP_SERVER,
        streamMonitor: getLocalRtmpStreams(),
        streamsInCurrentServer: getLocalRtmpStreams().length,
    })
})

module.exports = router
