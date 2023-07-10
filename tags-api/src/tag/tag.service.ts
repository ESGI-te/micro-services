import { Injectable } from '@nestjs/common';
import { Tag } from '../stubs/tag/tag';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.TagCreateInput): Promise<any> {
    return this.prisma.tag.create({ data });
  }

  findAll(): Promise<any[]> {
    return this.prisma.tag.findMany();
  }

  findAllById(ids?: string[]): Promise<any[]> {
    return this.prisma.tag.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  findById(id: string): Promise<any> {
    return this.prisma.tag.findUnique({
      where: { id },
    });
  }

  findByName(name: string): Promise<any> {
    return this.prisma.tag.findUnique({
      where: { name },
    });
  }

  async update(id: string, data: Prisma.TagUpdateInput): Promise<any> {
    return this.prisma.tag.update({
      where: { id },
      data,
    });
  }

  delete(id: string): Promise<any> {
    return this.prisma.tag.delete({
      where: { id },
    });
  }
}
