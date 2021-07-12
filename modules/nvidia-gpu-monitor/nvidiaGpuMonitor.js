const smi = require('node-nvidia-smi')

const getIsGpuPresent = async () => {
    try {
        const response = await getGpuData()
        console.log(response)
    } catch (err) {
        console.log(err)
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
getIsGpuPresent()
module.exports = { getIsGpuPresent }
