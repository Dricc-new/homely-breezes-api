import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { QueryDTO } from 'src/utils/query.dto';

// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    public async create(@Body() user: UserDTO) {
        return await this.usersService.create(user)
    }

    @Get('all')
    public async getAll(@Query() query: QueryDTO) {
        return await this.usersService.findAll(query)
    }

    @Get(':id')
    public async getById(@Param('id') id: string) {
        return await this.usersService.findById(id)
    }

    @Put(':id')
    public async update(@Body() user: UserUpdateDTO, @Param('id') id: string) {
        return await this.usersService.update(user, id)
    }

    @Delete(':id')
    public async remove(@Param('id') id: string) {
        return await this.usersService.delete(id)
    }

    @Post('enabled/:id')
    public async enabledUser(@Param('id') id: string) {
        return await this.usersService.update({ enabled: true }, id)
    }

    @Post('disabled/:id')
    public async disabledUser(@Param('id') id: string) {
        return await this.usersService.update({ enabled: false }, id)
    }

}
