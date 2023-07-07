import { GrpcOptions, Transport } from '@nestjs/microservices';
import { NOTE_PACKAGE_NAME } from './stubs/note/note';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:6000',
    package: NOTE_PACKAGE_NAME,
    protoPath: join(__dirname, 'proto/note.proto'),
  },
}) as GrpcOptions;
