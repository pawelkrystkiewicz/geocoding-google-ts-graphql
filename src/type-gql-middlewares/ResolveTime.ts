import { MiddlewareFn } from 'type-graphql';
const signale = require('signale');
export const ResolveTime: MiddlewareFn = async ({ info }, next) => {
	const start = Date.now();
	await next();
	const resolveTime = Date.now() - start;
	signale.complete({ prefix: `${info.parentType.name}.[${info.fieldName}]`, message: resolveTime, suffix: 'ms' });
};
