import { Injectable } from '@nestjs/common';
import { Note } from '../stubs/note/note';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.NoteCreateInput): Promise<Note> {
    return this.prisma.note.create({ data });
  }

  findAll(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }

  findById(id: string): Promise<Note> {
    return this.prisma.note.findUnique({
      where: { id },
    });
  }

  findByTitle(title: string): Promise<Note> {
    return this.prisma.note.findUnique({
      where: { title },
    });
  }

  async update(id: string, data: Prisma.NoteUpdateInput): Promise<Note> {
    return this.prisma.note.update({
      where: { id },
      data,
    });
  }

  delete(id: string): Promise<Note> {
    return this.prisma.note.delete({
      where: { id },
    });
  }
}
