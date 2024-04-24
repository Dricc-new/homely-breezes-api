import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './entities/users.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Users.name, schema: UsersSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService,MongooseModule]
})
export class UsersModule { }
