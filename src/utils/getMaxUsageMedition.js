const {
    getLastReadGpuUsageHighestValue,
} = require('../modules/nvidia-gpu-monitor/nvidiaGpuMonitor')
const { getLastReadCpuUsage } = require('../modules/cpu-monitor/cpuMonitor')
const getMaxUsageMedition = () => {
    const lastReportedCPUUsage = getLastReadCpuUsage()
    const lastReportedMaxGPUUsage = getLastReadGpuUsageHighestValue()

    if (!lastReportedMaxGPUUsage) return lastReportedCPUUsage
    if (lastReportedMaxGPUUsage > lastReportedCPUUsage)
        return lastReportedMaxGPUUsage
    else return lastReportedCPUUsage
}
module.exports = { getMaxUsageMedition }
