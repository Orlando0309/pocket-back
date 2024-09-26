import { ObjectType, Field } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@ObjectType()
export class User {
  @Field(() => GraphQLString, { description: 'Example field (placeholder)' })
  email: string;
  @Field(() => GraphQLString, { description: 'Example field (placeholder)' })
  password: string;
}
@ObjectType()
export class SignInToken {
  @Field(() => GraphQLString, { description: 'Example field (placeholder)' })
  token: string;
}
