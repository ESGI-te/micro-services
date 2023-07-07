import { Injectable } from '@nestjs/common';
import { Tag } from './stubs/tag/tag';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.TagCreateInput): Promise<Tag> {
    return this.prisma.tag.create({ data });
  }

  findAll(): Promise<Tag[]> {
    return this.prisma.tag.findMany();
  }

  findById(id: string): Promise<Tag> {
    return this.prisma.tag.findUnique({
      where: { id },
    });
  }

  findByName(name: string): Promise<Tag> {
    return this.prisma.tag.findUnique({
      where: { name },
    });
  }

  async update(id: string, data: Prisma.TagUpdateInput): Promise<Tag> {
    return this.prisma.tag.update({
      where: { id },
      data,
    });
  }

  delete(id: string): Promise<Tag> {
    return this.prisma.tag.delete({
      where: { id },
    });
  }
}
