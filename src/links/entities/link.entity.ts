import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Tag } from 'src/tag/entities/tag.entity'; // Import the Tag entity if it's in another file

@ObjectType()
export class Link {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  domain: string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => [Tag], { nullable: true })
  tags?: Tag[];
}
