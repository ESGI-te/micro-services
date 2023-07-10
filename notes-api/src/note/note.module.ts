import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsModule } from '@nestjs/microservices';
import { TAG_CR_UD_SERVICE_NAME } from '../stubs/tag/tag';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { tagGrpcOptions } from 'src/config/grpc.option';

@Module({
  imports: [
    AuthModule,
    ClientsModule.registerAsync([
      {
        name: TAG_CR_UD_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (cs: ConfigService) => tagGrpcOptions(cs),
      },
    ]),
  ],
  controllers: [NoteController],
  providers: [NoteService, PrismaService],
})
export class NoteModule {}
