import { Inject, Injectable } from '@nestjs/common';
import { Note } from '../stubs/note/note';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import {
  TAG_CR_UD_SERVICE_NAME,
  TagCRUDServiceClient,
} from 'src/stubs/tag/tag';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class NoteService {
  private tagService: TagCRUDServiceClient;

  constructor(
    @Inject(TAG_CR_UD_SERVICE_NAME) private client: ClientGrpc,
    private prisma: PrismaService,
  ) {}

  onModuleInit() {
    this.tagService = this.client.getService<TagCRUDServiceClient>(
      TAG_CR_UD_SERVICE_NAME,
    );
  }

  create(data: Prisma.NoteCreateInput): Promise<Note> {
    const { tags } = data;
    if (tags) {
      if (!Array.isArray(tags)) {
        throw new Error('tags should be an array of strings');
      }
      if (!tags.length) return;
      const isValid = this.checkTags(tags);
      if (!isValid) {
        throw new Error('Invalid tags');
      }
    }

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

  checkTags(tags: string[]): boolean {
    const res = this.tagService.get({ ids: tags });
    return !!res;
  }
}
