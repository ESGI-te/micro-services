import { GrpcOptions, Transport } from '@nestjs/microservices';
import { TAG_PACKAGE_NAME } from './stubs/tag';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:6000',
    package: TAG_PACKAGE_NAME,
    protoPath: join(__dirname, 'proto/tag.proto'),
  },
}) as GrpcOptions;
