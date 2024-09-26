import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { CreateLinkInput } from './create-link.input';
import { IsOptional, IsString, IsUrl, IsArray } from 'class-validator';

@InputType()
export class UpdateLinkInput extends PartialType(CreateLinkInput) {
  @Field(() => Int)
  @IsString()
  id: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl()
  domain?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  image?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
