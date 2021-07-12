const configProvider = require('./modules/config-provider/configProvider')
const express = require('express')
const cors = require('cors')
const logger = require('./modules/logger/logger')

const innerTrunkRouter = require('./routers/innerTrunkRouter')
const {
    updateGpuUsageLastReadHighestValue,
} = require('./modules/nvidia-gpu-monitor/nvidiaGpuMonitor')
const {
    getIsGpuPresent,
} = require('./modules/nvidia-gpu-monitor/nvidiaGpuMonitor')

const app = express()
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(innerTrunkRouter)

app.listen(configProvider.OBS_LEAVES_INNER_TRUNK_PORT, () => {
    logger.debug(
        'Listenning on port ' + configProvider.OBS_LEAVES_INNER_TRUNK_PORT
    )
})
if (configProvider.GPU_MONITOR_ENABLED) {
    getIsGpuPresent().then((result) => {
        if (!result) {
            logger.error('Nvidia graphics card not found')
        } else {
            logger.debug('Starting Nvidia graphics card monitor')
            updateGpuUsageLastReadHighestValue()
            setInterval(() => {
                updateGpuUsageLastReadHighestValue()
            }, configProvider.GPU_MONITOR_INTERVAL_IN_SECONDS * 1000)
        }
    })
}
