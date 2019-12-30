import { buildSchema } from 'type-graphql';
import { ResolveTime } from '../type-gql-middlewares/ResolveTime';
import { ErrorInterceptor } from '../type-gql-middlewares/ErrorInterceptor';
import { CompetitorDetector } from '../type-gql-middlewares/CompetitorDetector';

export const createSchema = () =>
	buildSchema({
		resolvers: [ __dirname + '/../resolvers/**/*.resolver.?s' ],
		// globalMiddlewares: [ ResolveTime,  CompetitorDetector ]
	});
