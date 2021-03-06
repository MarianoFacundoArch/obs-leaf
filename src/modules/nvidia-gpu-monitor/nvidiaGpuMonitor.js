const smi = require('node-nvidia-smi')
const logger = require('../logger/logger')

let lastGpuUtilizationMaxValue
let isGpuPresentCached = null
const updateGpuUsageLastReadHighestValue = async () => {
    try {
        lastGpuUtilizationMaxValue = await getMaxGpuUsageValue()
    } catch (err) {
        logger.error('Error on lastGPUUtilizationMaxValue ' + err.toString())
    }
}

const getLastReadGpuUsageHighestValue = () => {
    return lastGpuUtilizationMaxValue
}
const getIsGpuPresent = async () => {
    if (isGpuPresentCached == null) {
        try {
            await getGpuData()
            isGpuPresentCached = true
        } catch (err) {
            isGpuPresentCached = false
        }
    }
    return isGpuPresentCached
}

const getMaxGpuUsageValue = async () => {
    try {
        let highestValueSoFar = null
        const response = await getGpuData()
        const utilizationObject = response.nvidia_smi_log.gpu.utilization

        Object.keys(utilizationObject).forEach((currentKey) => {
            const currentRead = parseInt(
                utilizationObject[currentKey].replace(' %', '')
            )
            if (!highestValueSoFar || highestValueSoFar < currentRead)
                highestValueSoFar = currentRead
        })

        return highestValueSoFar
    } catch (err) {
        logger.error('Error on getMaxGpuUsageValue: ' + err.toString())
        return 100
    }
}
const getGpuData = () => {
    return new Promise((resolve, reject) => {
        smi(function (err, data) {
            // handle errors
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

module.exports = {
    getIsGpuPresent,
    updateGpuUsageLastReadHighestValue,
    getMaxGpuUsageValue,
    getLastReadGpuUsageHighestValue,
}
