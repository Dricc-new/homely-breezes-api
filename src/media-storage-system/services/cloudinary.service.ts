import { Injectable, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Medias, MediasDocument } from '../entities/media.entity';
import { Model } from 'mongoose';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { ConfigService } from '@nestjs/config';
import { MEDIA_TYPES } from 'src/constants';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
    constructor(
        @InjectModel(Medias.name) public readonly mediasModel: Model<MediasDocument>,
        private readonly configService: ConfigService,
    ) {
        cloudinary.config({
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
            secure: this.configService.get('CLOUDINARY_SECORE'),
        });
    }

    private async upload(@UploadedFile() file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream({
                folder: this.configService.get('CLOUDINARY_FOLDER'),
                unique_filename: true,
                resource_type: 'auto'
            }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });

            toStream(file.buffer).pipe(upload);
        });
    }

    public async create(@UploadedFile() file: Express.Multer.File, type: MEDIA_TYPES = MEDIA_TYPES.IMAGE) {
        const res = await this.upload(file)
        return await this.mediasModel.create({ url: res.secure_url, key: res.public_id, type })
    }


    public async get(id: string) {
        const { url, type } = await this.mediasModel.findById(id)
        return { url, type }
    }

    public async update(id: string, @UploadedFile() file: Express.Multer.File) {
        const media = await this.mediasModel.findById(id)

        await cloudinary.uploader.destroy(media.key)

        const res = await this.upload(file)

        return await this.mediasModel.findByIdAndUpdate(id, { url: res.secure_url, key: res.public_id, type: media.type })
    }

    public async destroy(id: string) {
        const media = await this.mediasModel.findById(id)

        await cloudinary.uploader.destroy(media.key)
        // return await this.mediasModel.findByIdAndRemove(id)
    }
}
