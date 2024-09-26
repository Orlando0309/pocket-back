import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsUrl, IsArray } from 'class-validator';

@InputType()
export class CreateLinkInput {
  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsUrl()
  domain: string;

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

export class ServiceInput {
  @IsString()
  title: string;

  @IsUrl()
  domain: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  userId?: number;

  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
