import { Module } from '@nestjs/common';
import { MediaStorageSystemService } from './services/media-storage-system.service';
import { CloudinaryService } from './services/cloudinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Medias, MediasSchema } from './entities/media.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Medias.name, schema: MediasSchema }])],
  providers: [MediaStorageSystemService, CloudinaryService],
  exports: [MediaStorageSystemService, MongooseModule],
})
export class MediaStorageSystemModule { }
