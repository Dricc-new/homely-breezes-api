import { Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class MediaStorageSystemService extends CloudinaryService {

}
