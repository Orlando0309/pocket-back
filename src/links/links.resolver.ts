import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { LinksService } from './links.service';
import { Link } from './entities/link.entity';
import { CreateLinkInput } from './dto/create-link.input';
import { UpdateLinkInput } from './dto/update-link.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Link)
@UseGuards(AuthGuard)
export class LinksResolver {
  constructor(private readonly linksService: LinksService) {}

  @Mutation(() => Link)
  createLink(
    @Args('link') createLinkInput: CreateLinkInput,
    @Context() context,
  ) {
    return this.linksService.create({
      ...createLinkInput,
      userId: context?.user?.id,
    });
  }

  @Query(() => [Link], { name: 'links' })
  findAll(@Context() context) {
    return this.linksService.findAll();
  }

  @Query(() => Link, { name: 'link' })
  findOne(@Args('id', { type: () => Int }) id: number, @Context() context) {
    return this.linksService.findOne(id);
  }

  @Mutation(() => Link)
  updateLink(
    @Args('updateLinkInput') updateLinkInput: UpdateLinkInput,
    @Context() context,
  ) {
    return this.linksService.update(updateLinkInput.id, updateLinkInput);
  }

  @Mutation(() => Link)
  removeLink(@Args('id', { type: () => Int }) id: number, @Context() context) {
    return this.linksService.remove(id);
  }
}
