import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SinglePagesService } from '../services/single-pages.service';
import { SinglePageDTO, SinglePageUpdateDTO } from '../dto/single-page.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { QueryDTO } from 'src/utils/query.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { VISIBILITY } from 'src/constants/roles';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('single-pages')
export class SinglePagesController {
    constructor(private readonly singlePagesService: SinglePagesService) { }

    @Post()
    public async create(@Body() user: SinglePageDTO) {
        console.log(user)
        return await this.singlePagesService.create(user)
    }

    @PublicAccess()
    @Get('all')
    public async getAll(@Query() query: QueryDTO) {
        return await this.singlePagesService.findAll(query)
    }

    @PublicAccess()
    @Get(':id')
    public async getById(@Param('id') id: string) {
        return await this.singlePagesService.findById(id)
    }

    @Put(':id')
    public async update(@Body() user: SinglePageUpdateDTO, @Param('id') id: string) {
        return await this.singlePagesService.update(user, id)
    }

    @Delete(':id')
    public async remove(@Param('id') id: string) {
        return await this.singlePagesService.delete(id)
    }

    @Post('draft/:id')
    public async draf(@Param('id') id: string) {
        return await this.singlePagesService.update({ visibility: VISIBILITY.DRAFT }, id)
    }

    @Post('published/:id')
    public async published(@Param('id') id: string) {
        return await this.singlePagesService.update({ visibility: VISIBILITY.PUBLISH }, id)
    }
}
