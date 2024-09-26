import { InputType, Field } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@InputType()
export class SignInUserInput {
  @Field(() => GraphQLString, { description: 'Example field (placeholder)' })
  email: string;
  @Field(() => GraphQLString, { description: 'Example field (placeholder)' })
  password: string;
}
