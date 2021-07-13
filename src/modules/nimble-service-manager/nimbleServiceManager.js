const logger = require('../logger/logger');
const { exec } = require('child_process');
const moment = require('moment');

let lastServiceResetByApplication = null;

const resetAntMedia = () => {
	return new Promise((resolve, reject) => {
		exec('service antmedia restart', (error, stdout, stderr) => {
			if (error) {
				logger.error('Error restarting antmedia: ' + error);
				reject(error);
				return;
			}
			if (stderr) {
				logger.error('StdErr on restarting antmedia: ' + stderr);
				reject(stderr);
				return;
			}
			resolve();
			lastServiceResetByApplication = new moment();
		});
	});
};

const getAntMediaServiceInformation = () => {
	return new Promise((resolve, reject) => {
		exec('service antmedia status', (error, stdout, stderr) => {
			if (error) {
				logger.error('Error trying to get service status of antmedia: ' + error);
				reject(error);
				return;
			}
			if (stderr) {
				logger.error('StdErr trying to get service status of antmedia: ' + error);
				reject(stderr);
				return;
			}
			resolve(stdout);
		});
	});
};

const getLastAntMediaResetByApplication = () => {
	return lastServiceResetByApplication;
};
module.exports = {
	resetAntMedia,
	getLastAntMediaResetByApplication,
	getAntMediaServiceInformation
};
