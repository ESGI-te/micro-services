import { Inject, OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  ValidateResponse,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
} from 'src/stubs/auth/auth';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>('AuthService');
  }

  async validate(jwt: string): Promise<ValidateResponse> {
    const res: ValidateResponse = await firstValueFrom(
      this.authService.validate({
        jwt,
      }) as any,
    );

    return res;
  }
}
