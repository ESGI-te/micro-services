import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
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
} from './stubs/note/note';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';

@Controller()
@NoteCRUDServiceControllerMethods()
export class AppController implements NoteCRUDServiceController {
  constructor(private readonly appService: AppService) {}

  async get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> {
    if (request.id) {
      const note: Note = await this.appService.findById(request.id);
      return { notes: [note] };
    } else if (request.title) {
      const note: Note = await this.appService.findByTitle(request.title);
      return { notes: [note] };
    } else {
      const notes: Note[] = await this.appService.findAll();
      return { notes };
    }
  }

  async update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> {
    const id = request.id;

    Object.keys(request).forEach(
      (key) => request[key] === undefined && delete request[key],
    );

    delete request.id;

    const note = await this.appService.update(id, request);

    return { note };
  }

  async delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> {
    const note = await this.appService.delete(request.id);

    return { note };
  }

  @GrpcMethod(NOTE_CR_UD_SERVICE_NAME)
  async add(request: AddRequest): Promise<AddResponse> {
    const note = await this.appService.create(request as any);

    return { note };
  }
}
