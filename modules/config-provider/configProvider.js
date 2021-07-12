const dotenvExtended = require('dotenv-extended')
// const dotenvMustache = require('dotenv-mustache');
const dotenvParseVariables = require('dotenv-parse-variables')

let configProvider = dotenvExtended.load({
    silent: true,
    errorOnMissing: false,
    errorOnExtra: true,
    includeProcessEnv: true,
    assignToProcessEnv: true,
    overrideProcessEnv: false,
    errorOnRegex: true,
})

// env = dotenvMustache(env);
configProvider = dotenvParseVariables(configProvider)

module.exports = configProvider
