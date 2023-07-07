/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "tag";

export interface Tag {
  id?: string;
  Name?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface GetRequest {
  id?: string;
  name?: string;
}

export interface GetResponse {
  tags?: Tag[];
}

export interface AddRequest {
  name?: string;
}

export interface AddResponse {
  tag?: Tag;
}

export interface UpdateRequest {
  id?: string;
  name?: string;
}

export interface UpdateResponse {
  tag?: Tag;
}

export interface DeleteRequest {
  id?: string;
}

export interface DeleteResponse {
  tag?: Tag;
}

export const TAG_PACKAGE_NAME = "tag";

export interface TagCRUDServiceClient {
  get(request: GetRequest, metadata?: Metadata): Observable<GetResponse>;

  add(request: AddRequest, metadata?: Metadata): Observable<AddResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;
}

export interface TagCRUDServiceController {
  get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> | Observable<GetResponse> | GetResponse;

  add(request: AddRequest, metadata?: Metadata): Promise<AddResponse> | Observable<AddResponse> | AddResponse;

  update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
}

export function TagCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get", "add", "update", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TagCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TagCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TAG_CR_UD_SERVICE_NAME = "TagCRUDService";
