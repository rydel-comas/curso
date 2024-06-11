import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Auth } from 'src/common/decorators/auth.decorator';
import { ProductInterceptors } from 'src/common/interceptors/products.interceptor';
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @UseInterceptors(ProductInterceptors)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Auth() { userId }) {
    return this.productsService.create(createProductDto, userId);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(id);
  }
}
