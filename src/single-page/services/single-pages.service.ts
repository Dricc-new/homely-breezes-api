import { Injectable } from '@nestjs/common';
import { SinglePagesDocument, SinglePages } from '../entities/single-pages.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SinglePageDTO, SinglePageUpdateDTO } from '../dto/single-page.dto';
import { QueryDTO } from 'src/utils/query.dto';
import { ErrorManager } from 'src/config/error.manager';


@Injectable()
export class SinglePagesService {
    constructor(@InjectModel(SinglePages.name)
    public readonly singlePagesModel: Model<SinglePagesDocument>,) { }

    /******CRUD*******/

    public async create(body: SinglePageDTO): Promise<SinglePages> {
        try {
            const created = new this.singlePagesModel(body);
            return await created.save();
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message)
        }
    }

    public async findAll(query: QueryDTO) {
        try {
            const result = await this.singlePagesModel.find()
            return result
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message)
        }
    }

    public async findById(id: string): Promise<SinglePages> {
        try {
            return await this.singlePagesModel.findById(id)
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message)
        }
    }

    public async findBy(filter: Partial<SinglePageDTO>) {
        try {
            const user: SinglePages = await this.singlePagesModel.findOne(filter)
            return user
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message)
        }
    }

    public async update(body: SinglePageUpdateDTO, id: string) {
        try {
            const user = await this.singlePagesModel.findByIdAndUpdate(id, body)
            return user
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message)
        }
    }

    public async delete(id: string) {
        try {
            const user = await this.singlePagesModel.findByIdAndDelete(id)
            return user
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message)
        }
    }

    /***************/
}
