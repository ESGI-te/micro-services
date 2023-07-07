import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import grpcOption from './config/grpc.option';
import { WinstonModule } from 'nest-winston';
import winstonConfig from './config/winston.config';

const envSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  PORT: Joi.number().default(4000),
  insecure: Joi.boolean().required(),
  USER_CERT: Joi.string().when('insecure', {
    is: false,
    then: Joi.required(),
  }),
  USER_KEY: Joi.string().when('insecure', {
    is: false,
    then: Joi.required(),
  }),
  ROOT_CA: Joi.string().when('insecure', {
    is: false,
    then: Joi.required(),
  }),
  JAEGER_URL: Joi.string(),
  AUTH_API_URL: Joi.string().required(),
});
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: envSchema,
      isGlobal: true,
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => winstonConfig(cs),
    }),
    GrpcReflectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => grpcOption(cs),
    }),
    UserModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
