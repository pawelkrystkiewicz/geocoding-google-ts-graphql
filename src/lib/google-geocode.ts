import Axios from 'axios';
import * as config from '@utils/config';
const signale = require('signale');

const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';

const geocoding = async (address) => {
	const queryString = `${apiUrl}&address=${encodeURIComponent(address)}&key=${config.API_KEY}`;
	return await Axios.get(queryString)
		.then((res) => {
			return Promise.resolve(res.data);
		})
		.catch((res) => {
			signale.fatal(res);
			return Promise.reject(res);
		});
};

export default geocoding;
