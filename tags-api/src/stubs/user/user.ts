/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "user";

export enum UserRole {
  USER_ROLE_BASIC = 0,
  USER_ROLE_ADMIN = 1,
  UNRECOGNIZED = -1,
}

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  role?: UserRole;
}

export interface RegisterRequest {
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface RegisterResponse {
  user?: User;
}

export interface UpdateRequest {
  id?: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateResponse {
  user?: User;
}

export interface DeleteRequest {
  id?: string;
}

export interface DeleteResponse {
  user?: User;
}

export interface UpdatePasswordRequest {
  id?: string;
  password?: string;
}

export interface UpdatePasswordResponse {
  user?: User;
}

export interface FindRequest {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface FindResponse {
  user?: User[];
}

export interface CheckPasswordRequest {
  email?: string;
  password?: string;
}

export interface CheckPasswordResponse {
  status?: CheckPasswordResponse_STATUS;
  user?: User;
}

export enum CheckPasswordResponse_STATUS {
  OK = 0,
  WRONG_PASSWORD = 1,
  NOT_FOUND = 2,
  INTERNAL = 3,
  UNRECOGNIZED = -1,
}

export interface MakeAdminRequest {
  id?: string;
  email?: string;
}

export interface MakeAdminResponse {
  user?: User;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  find(request: FindRequest, metadata?: Metadata): Observable<FindResponse>;

  checkPassword(request: CheckPasswordRequest, metadata?: Metadata): Observable<CheckPasswordResponse>;

  register(request: RegisterRequest, metadata?: Metadata): Observable<RegisterResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  updatePassword(request: UpdatePasswordRequest, metadata?: Metadata): Observable<UpdatePasswordResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;

  makeAdmin(request: MakeAdminRequest, metadata?: Metadata): Observable<MakeAdminResponse>;
}

export interface UserServiceController {
  find(request: FindRequest, metadata?: Metadata): Promise<FindResponse> | Observable<FindResponse> | FindResponse;

  checkPassword(
    request: CheckPasswordRequest,
    metadata?: Metadata,
  ): Promise<CheckPasswordResponse> | Observable<CheckPasswordResponse> | CheckPasswordResponse;

  register(
    request: RegisterRequest,
    metadata?: Metadata,
  ): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  updatePassword(
    request: UpdatePasswordRequest,
    metadata?: Metadata,
  ): Promise<UpdatePasswordResponse> | Observable<UpdatePasswordResponse> | UpdatePasswordResponse;

  delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  makeAdmin(
    request: MakeAdminRequest,
    metadata?: Metadata,
  ): Promise<MakeAdminResponse> | Observable<MakeAdminResponse> | MakeAdminResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "find",
      "checkPassword",
      "register",
      "update",
      "updatePassword",
      "delete",
      "makeAdmin",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
