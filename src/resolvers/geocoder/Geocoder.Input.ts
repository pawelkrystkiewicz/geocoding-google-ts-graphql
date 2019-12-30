import { ArgsType, Field } from 'type-graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class GeocoderInput {
	@IsString()
	@Field({ nullable: false })
	address?: string;
}
