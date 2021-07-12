const smi = require('node-nvidia-smi')
const logger = require('../logger/logger')

let lastReadHighestValue

const updateLastReadHighestValue = () => {
    lastReadHighestValue = getMaxGpuUsageValue()
}
const getIsGpuPresent = async () => {
    try {
        await getGpuData()
        return true
    } catch (err) {
        return false
    }
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
        logger.error('Error on getMaxGpuUsageValue: ' + err)
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

console.log(getMaxGpuUsageValue)
module.exports = {
    getIsGpuPresent,
    updateLastReadHighestValue,
    getMaxGpuUsageValue,
}
