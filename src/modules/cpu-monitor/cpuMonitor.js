const osutils = require('os-utils')
const logger = require('../logger/logger')

let lastReadCpuUsage

const getLastReadCpuUsage = () => {
    return lastReadCpuUsage
}
const updateLastReadCpuUsage = () => {
    try {
        osutils.cpuUsage((v) => {
            const value = v * 100
            lastReadCpuUsage = value
        })
    } catch (err) {
        logger.error('Error on updateLastReadCpuUsage: ' + err.toString())
    }
}

module.exports = { updateLastReadCpuUsage, getLastReadCpuUsage }
