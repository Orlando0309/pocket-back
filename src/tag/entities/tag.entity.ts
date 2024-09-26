import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Link } from 'src/links/entities/link.entity'; // Import the Links entity if it's in another file
import { User } from 'src/user/entities/user.entity'; // Import the User entity if it's in another file

@ObjectType()
export class Tag {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  textcolor?: string;

  @Field(() => Int, { nullable: true })
  linksId?: number;

  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => Link, { nullable: true })
  links?: Link;

  @Field(() => User, { nullable: true })
  user?: User;
}
