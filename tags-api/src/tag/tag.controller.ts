import { Controller, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import {
  AddRequest,
  AddResponse,
  DeleteRequest,
  DeleteResponse,
  GetRequest,
  GetResponse,
  TAG_CR_UD_SERVICE_NAME,
  Tag,
  TagCRUDServiceController,
  UpdateRequest,
  UpdateResponse,
  TagCRUDServiceControllerMethods,
} from '../stubs/tag/tag';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { GrpcAuthGuard } from 'src/auth/auth.guard';

@Controller()
@TagCRUDServiceControllerMethods()
export class TagController implements TagCRUDServiceController {
  constructor(private readonly appService: TagService) {}

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(TAG_CR_UD_SERVICE_NAME)
  async get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> {
    if (request.id) {
      const tag: Tag = await this.appService.findById(request.id);
      return { tags: [tag] };
    } else if (request.name) {
      const tag: Tag = await this.appService.findByName(request.name);
      return { tags: [tag] };
    } else if (request.ids) {
      const tags: Tag[] = await this.appService.findAllById(request.ids);
      return { tags };
    } else {
      const tags: Tag[] = await this.appService.findAll();
      return { tags };
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(TAG_CR_UD_SERVICE_NAME)
  async update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> {
    const id = request.id;

    Object.keys(request).forEach(
      (key) => request[key] === undefined && delete request[key],
    );

    delete request.id;

    const tag = await this.appService.update(id, request);

    return { tag };
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(TAG_CR_UD_SERVICE_NAME)
  async delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> {
    const tag = await this.appService.delete(request.id);

    return { tag };
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod(TAG_CR_UD_SERVICE_NAME)
  async add(request: AddRequest): Promise<AddResponse> {
    const tag = await this.appService.create(request as any);

    return { tag };
  }
}
