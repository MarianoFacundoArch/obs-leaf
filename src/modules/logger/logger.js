const log4js = require('log4js')
const path = require('path')
const chalk = require('chalk')
log4js.configure({
    appenders: {
        consoleAppender: { type: 'console' },
        fileAppender: {
            type: 'file',
            filename: path.join(__dirname, '../../../error.log'),
        },
    },
    categories: {
        // default: { appenders: ['webRtcLeafAppender'], level: 'error' }
        default: {
            appenders: ['consoleAppender', 'fileAppender'],
            level: 'debug',
        },
    },
})
console.log(
    chalk.yellow(
        'Error log can be found on: ' +
            path.join(__dirname, '../../../error.log')
    )
)
const logger = log4js.getLogger('filtAppender')

module.exports = logger
