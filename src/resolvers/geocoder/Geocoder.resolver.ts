import GraphQLJSON from 'graphql-type-json';
import { Args, Query, Resolver } from 'type-graphql';
import { GeocoderInput } from './Geocoder.Input';
import geocoding from '@root/lib/google-geocode';
const signale = require('signale');

@Resolver()
export class GeocoderResolver {
	@Query(() => GraphQLJSON, { nullable: true })
	async geocode(@Args() { address }: GeocoderInput) {
		signale.start(`Geocoder start`);
		return await geocoding(address);
	}
}
