import { Module, Global } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
  imports: [UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRE'),
        }
      })
    })],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
