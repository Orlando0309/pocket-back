import { Injectable } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { PrismaService } from 'src/prisma/prisma.service'; // Import your PrismaService

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTagInput: CreateTagInput) {
    // Create a new tag in the database
    const tag = await this.prisma.tag.create({
      data: createTagInput,
    });
    return tag;
  }

  async createMany(createTagInputs: CreateTagInput[]) {
    // Insert multiple tags into the database
    const tags = await this.prisma.tag.createMany({
      data: createTagInputs,
    });
    return tags;
  }

  async findAll() {
    // Return all tags
    return this.prisma.tag.findMany();
  }

  async findOne(id: number) {
    // Return a tag by its ID
    return this.prisma.tag.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTagInput: UpdateTagInput) {
    // Update a tag by its ID
    return this.prisma.tag.update({
      where: { id },
      data: updateTagInput,
    });
  }

  async remove(id: number) {
    // Remove a tag by its ID
    return this.prisma.tag.delete({
      where: { id },
    });
  }
}
