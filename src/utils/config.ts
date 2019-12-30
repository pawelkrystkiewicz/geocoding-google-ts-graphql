import * as dotenv from 'dotenv';

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
	case 'test':
		path = `${__dirname}/../../.env.test`;
		break;
	case 'production':
		path = `${__dirname}/../../.env.production`;
		break;
	default:
		path = `${__dirname}/../../.env.development`;
}

dotenv.config({
	path: path
});

export const PROD = process.env.NODE_ENV === 'production';

export const { CORS_URL, PORT = 4000, API_KEY } = process.env;
