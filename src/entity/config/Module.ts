import dbConfig from '@root/dbConfig';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CommonColumns } from '../CommonColumns';
import { Setting } from './Setting';

@ObjectType()
@Entity({ ...dbConfig.config.module })
export class Module extends BaseEntity {
	@Field(() => ID)
	@Index({ unique: true })
	@PrimaryGeneratedColumn('increment', { name: 'Id' })
	id: number;

	@Field(() => CommonColumns)
	@Column((type) => CommonColumns)
	common: CommonColumns;

	@OneToMany(() => Setting, (setting) => setting.module)
	setting: Setting[];

	@Field()
	@Column({ name: 'Name' })
	name: string;
}
