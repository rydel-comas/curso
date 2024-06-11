import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Auth } from 'src/common/decorators/auth.decorator';
import { ProviderInterceptors } from '../common/interceptors/providers.interceptor';

@UseGuards(JwtAuthGuard)
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}
  
  @UseInterceptors(ProviderInterceptors)
  @Post()
  create(@Body() createProvidersDto: CreateProviderDto, @Auth() { userId }) {
    return this.providersService.create(createProvidersDto, userId);
  }

  @Get()
  findAll() {
    return this.providersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProvidersDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProvidersDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
