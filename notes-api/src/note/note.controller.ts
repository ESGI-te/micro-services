import { Controller, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import {
  AddRequest,
  AddResponse,
  DeleteRequest,
  DeleteResponse,
  GetRequest,
  GetResponse,
  NOTE_CR_UD_SERVICE_NAME,
  Note,
  NoteCRUDServiceController,
  UpdateRequest,
  UpdateResponse,
  NoteCRUDServiceControllerMethods,
} from '../stubs/note/note';
import { GrpcMethod, Payload, RpcException } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { GrpcAuthGuard } from 'src/auth/auth.guard';
import { GRPCUser } from 'src/auth/user.decorator';

@Controller()
@NoteCRUDServiceControllerMethods()
export class NoteController implements NoteCRUDServiceController {
  constructor(private readonly appService: NoteService) {}

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(NOTE_CR_UD_SERVICE_NAME)
  async get(req: GetRequest, metadata?: Metadata): Promise<GetResponse> {
    try {
      if (req.id) {
        const note: Note = await this.appService.findById(req.id);
        return { notes: [note] };
      } else if (req.title) {
        const note: Note = await this.appService.findByTitle(req.title);
        return { notes: [note] };
      } else {
        const notes: Note[] = await this.appService.findAll();
        return { notes };
      }
    } catch (error) {
      this.handlePrismaErr(error);
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(NOTE_CR_UD_SERVICE_NAME)
  async update(
    @Payload() req: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> {
    try {
      const id = req.id;

      Object.keys(req).forEach(
        (key) => req[key] === undefined && delete req[key],
      );

      delete req.id;

      const note = await this.appService.update(id, req);

      return { note };
    } catch (error) {
      this.handlePrismaErr(error);
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(NOTE_CR_UD_SERVICE_NAME)
  async delete(
    req: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> {
    try {
      const note = await this.appService.delete(req.id);

      return { note };
    } catch (error) {
      this.handlePrismaErr(error);
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(NOTE_CR_UD_SERVICE_NAME)
  async add(
    @Payload() req: AddRequest,
    @GRPCUser() jwtUser,
  ): Promise<AddResponse> {
    try {
      const data = { ...req, userId: jwtUser.id };
      const note = await this.appService.create(data as any);

      return { note };
    } catch (error) {
      this.handlePrismaErr(error);
    }
  }

  private handlePrismaErr(err: Error) {
    console.error(err);
    if (err instanceof RpcException) throw err;
    else throw new RpcException(err);
  }
}
