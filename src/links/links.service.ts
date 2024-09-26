import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceInput } from './dto/create-link.input';
import { UpdateLinkInput } from './dto/update-link.input';
import { TagService } from 'src/tag/tag.service';

@Injectable()
export class LinksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tagService: TagService,
  ) {}

  async create(createLinkInput: ServiceInput) {
    const { title, domain, image, userId, tags } = createLinkInput;

    // Create or fetch the tags
    const tagRecords = await Promise.all(
      tags.map(async (tagName) => {
        return this.tagService.create({ name: tagName });
      }),
    );

    // Create the link in the database
    const link = await this.prisma.links.create({
      data: {
        title,
        domain,
        image,
        userId,
        tags: {
          connect: tagRecords.map((tag) => ({ id: tag.id })), // Connect using the `id` of the tags
        },
      },
      select: {
        id: true,
        title: true,
        domain: true,
        image: true,
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    return link;
  }

  // Get all links
  async findAll() {
    // Retrieve all links from the database
    return this.prisma.links.findMany({
      include: {
        user: true, // Include the related user information
        tags: true, // Include the related tags information
      },
    });
  }

  // Get a single link by ID
  async findOne(id: number) {
    // Find the link by its ID
    const link = await this.prisma.links.findUnique({
      where: { id },
      include: {
        user: true, // Include the related user information
        tags: true, // Include the related tags information
      },
    });
    if (!link) {
      throw new Error(`Link with ID ${id} not found`);
    }
    return link;
  }

  // Update a link by ID
  async update(id: number, updateLinkInput: UpdateLinkInput) {
    const { title, domain, image } = updateLinkInput;

    // Update the link in the database
    const updatedLink = await this.prisma.links.update({
      where: { id },
      data: {
        title,
        domain,
        image,
      },
    });
    return updatedLink;
  }

  // Remove a link by ID
  async remove(id: number) {
    // Delete the link from the database
    return this.prisma.links.delete({
      where: { id },
    });
  }
}
