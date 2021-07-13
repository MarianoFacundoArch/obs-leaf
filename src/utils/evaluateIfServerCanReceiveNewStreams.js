const {
    getLastReadGpuUsageHighestValue,
} = require('../modules/nvidia-gpu-monitor/nvidiaGpuMonitor')
const configProvider = require('../modules/config-provider/configProvider')
const {
    getIsNimbleResponsive,
} = require('../modules/nimble-status-monitor/nimbleStatusMonitor')
const { getLastReadCpuUsage } = require('../modules/cpu-monitor/cpuMonitor')
const evaluateIfServerCanReceiveNewStreams = () => {
    const lastReportedCPUUsage = getLastReadCpuUsage()
    if (
        lastReportedCPUUsage &&
        lastReportedCPUUsage > configProvider.MAX_CPU_USAGE
    )
        return false
    const lastReportedMaxGPUUsage = getLastReadGpuUsageHighestValue()
    if (
        lastReportedMaxGPUUsage &&
        lastReportedMaxGPUUsage > configProvider.MAX_GPU_USAGE
    )
        return false

    if (!getIsNimbleResponsive()) return false

    return true
}

module.exports = { evaluateIfServerCanReceiveNewStreams }
