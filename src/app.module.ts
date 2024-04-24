import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaStorageSystemModule } from './media-storage-system/media-storage-system.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule], 
    inject: [ConfigService],
    useFactory: async (conf: ConfigService) => ({ uri: conf.get('MONGODB_URI')}) 
  })
  , UsersModule, AuthModule, MediaStorageSystemModule],
})
export class AppModule { }
