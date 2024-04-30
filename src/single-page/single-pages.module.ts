import { Module } from '@nestjs/common';
import { SinglePagesController } from './controllers/single-pages.controller';
import { SinglePagesService } from './services/single-pages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SinglePages, SinglePagesSchema } from './entities/single-pages.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: SinglePages.name, schema: SinglePagesSchema }])],
  controllers: [SinglePagesController],
  providers: [SinglePagesService]
})
export class SinglePageModule { }
