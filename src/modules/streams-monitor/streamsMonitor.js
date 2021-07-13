const axios = require('axios')
const configProvider = require('../config-provider/configProvider')

const os = require('os')
const logger = require('../logger/logger')
const ip = require('ip')
const { getNimbleSalt } = require('../nimble-auth-provider/nimbleAuthProvider')
const { getNimbleHash } = require('../nimble-auth-provider/nimbleAuthProvider')
const {
    getArrayOrArrayWithSingleElementIfNotAnArray,
} = require('../../utils/getArrayOrArrayWithSingleElementIfNotAnArray')

let localRtmpStreams = []

const monitorLocalStreams = async () => {
    try {
        let currentLocalRtmpStreams = []
        const currentServerIpAddress = ip.address()
        const endpointData = await axios.get(
            `http://localhost:${
                configProvider.NIMBLE_MANAGEMENT_PORT
            }/manage/rtmp_status?salt=${getNimbleSalt()}&hash=${getNimbleHash()}`,
            {
                timeout: configProvider.NIMBLE_REQUEST_TIMEOUT_IN_MILLISECONDS,
            }
        )

        if (endpointData && endpointData.data) {
            const appsToMonitor = getArrayOrArrayWithSingleElementIfNotAnArray(
                configProvider.STREAM_MONITOR_NIMBLE_APPNAMES
            )
            endpointData.data.forEach((currentApp) => {
                if (
                    appsToMonitor.includes(currentApp.app) &&
                    currentApp.streams
                ) {
                    currentApp.streams.forEach((currentAppStream) => {
                        currentLocalRtmpStreams.push(
                            generateStreamMonitorObjectBasedOnStreamRestData(
                                currentAppStream,
                                currentServerIpAddress,
                                currentApp.app
                            )
                        )
                    })
                }
            })
        }
        localRtmpStreams = [...currentLocalRtmpStreams]
    } catch (err) {
        logger.error('Error on streamsMonitor - monitorLocalStreams : ' + err)
    }
}

const generateStreamMonitorObjectBasedOnStreamRestData = (
    streamRestData,
    serverIp,
    appName
) => {
    const currentHostname = os.hostname()
    return {
        streamId: streamRestData.strm,
        rtmpUrl:
            'rtmp://' +
            serverIp +
            ':' +
            configProvider.STREAM_MONITOR_NIMBLE_RTMP_PORT +
            '/' +
            appName +
            '/' +
            streamRestData.strm,
        resolution: streamRestData.resolution,
        bandwidth: streamRestData.bandwidth,
        serverName: currentHostname,
        appName: appName,
        rtmpPort: configProvider.STREAM_MONITOR_NIMBLE_RTMP_PORT,
        startTime: streamRestData.publish_time,
        ip: streamRestData.serverIp,
    }
}

const getLocalRtmpStreams = () => {
    return localRtmpStreams
}

module.exports = {
    monitorLocalStreams,
    getLocalRtmpStreams,
}
