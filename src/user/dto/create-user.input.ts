import { InputType, Field } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@InputType()
export class CreateUserInput {
  @Field(() => GraphQLString, { description: 'Example field (placeholder)' })
  email: string;
  @Field(() => GraphQLString, { description: 'Example field (placeholder)' })
  password: string;
}
