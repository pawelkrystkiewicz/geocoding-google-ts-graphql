import monitorConfig from '@utils/monitorConfig';
import { RedisCache } from 'apollo-server-cache-redis';
import { ApolloServer } from 'apollo-server-express';
import 'dotenv';
import express from 'express';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import http from 'http';
import 'reflect-metadata';
import { formatArgumentValidationError } from 'type-graphql';
import { IContext } from './types/IContext';
import * as config from './utils/config';
import { createSchema } from './utils/createSchema';
import cors = require('cors');
const signale = require('signale');

// signale.debug('Hello', 'from', 'L59');
// signale.pending('Write release notes for %s', '1.2.0');
// signale.fatal(new Error('Unable to acquire lock'));
// signale.watch('Recursively watching build directory...');
// signale.complete({prefix: '[task]', message: 'Fix issue #59', suffix: '(@klauscfhq)'});

const statusMonitor = require('express-status-monitor')(monitorConfig);

export const main = async () => {
	const schema = await createSchema();

	const apolloServer = new ApolloServer({
		schema,
		formatError: formatArgumentValidationError as any,
		context: ({ req, res }): IContext => ({ req, res }),
		playground: !config.PROD
	});

	const app = express();

	const corsOptions: cors.CorsOptions = {
		origin: `${config.CORS_URL}`,
		credentials: true
	};

	app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

	app.use('/', statusMonitor);

	app.get('/status', async (req, res) => {
		res.status(200).send('OK');
	});

	if (config.PROD) {
		app.get(`${apolloServer.graphqlPath}`, async (req, res) => {
			res.status(200).send('OK');
		});
	}

	apolloServer.applyMiddleware({ app, cors: corsOptions });

	const httpServer = http.createServer(app);

	httpServer.listen(Number(config.PORT), () => {
		signale.start(`Server is ready on http://localhost:${config.PORT}${apolloServer.graphqlPath}`);
	});
};

main().catch((error) => console.error(error));
