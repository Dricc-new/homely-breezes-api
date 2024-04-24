import { Injectable } from '@nestjs/common';
import { UsersDocument, Users } from '../entities/users.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { QueryDTO } from 'src/utils/query.dto';
// import { getOrder } from 'src/utils/orderBy';
// import { Paginate } from 'src/utils/pagination';
import { ErrorManager } from 'src/config/error.manager';


@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name)
    public readonly usersModel: Model<UsersDocument>,) { }

    /******CRUD*******/

    public async create(body: UserDTO): Promise<Users> {
        try {
            body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT)

            const createdUser = new this.usersModel(body);
            createdUser.markModified('jsonCanvas');
            return await createdUser.save();
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message)
        }
    }

    public async findAll(query: QueryDTO) {
        try {
            // let order = getOrder(query.orderBy)
            // if (!order) order = { username: 'ASC' }
            // const { take, skip } = Paginate(query.paginate)
            const result = await this.usersModel.find()
            return result
            // return { users: result[0], countAll: result[1] }
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message)
        }
    }

    public async findById(id: string): Promise<Users> {
        try {
            return await this.usersModel.findById(id)
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message)
        }
    }

    public async findBy(filter: Partial<UserDTO>) {
        try {
            const user: Users = await this.usersModel.findOne(filter)
            return user
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message)
        }
    }

    public async update(body: UserUpdateDTO, id: string) {
        try {
            if (body.password) body.password = body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT)

            const user = await this.usersModel.findByIdAndUpdate(id, body)
            return user
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message)
        }
    }

    public async delete(id: string) {
        try {
            const user = await this.usersModel.findByIdAndDelete(id)
            return user
        } catch (err) {
            throw ErrorManager.createSignatureError(err.message)
        }
    }

    /***************/

}
