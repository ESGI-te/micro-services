/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "note";

export interface Note {
  id?: string;
  title?: string;
  content?: string;
}

export interface GetRequest {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface GetResponse {
  notes?: Note[];
}

export interface AddRequest {
  title?: string;
  content?: string;
}

export interface AddResponse {
  note?: Note;
}

export interface UpdateRequest {
  id?: string;
  title?: string;
  content?: string;
}

export interface UpdateResponse {
  note?: Note;
}

export interface DeleteRequest {
  id?: string;
}

export interface DeleteResponse {
  note?: Note;
}

export const NOTE_PACKAGE_NAME = "note";

export interface NoteCRUDServiceClient {
  get(request: GetRequest, metadata?: Metadata): Observable<GetResponse>;

  add(request: AddRequest, metadata?: Metadata): Observable<AddResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;
}

export interface NoteCRUDServiceController {
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

export function NoteCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get", "add", "update", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("NoteCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("NoteCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const NOTE_CR_UD_SERVICE_NAME = "NoteCRUDService";
