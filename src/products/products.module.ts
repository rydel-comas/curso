import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductInterceptors } from '@interceptors/products.interceptor';


@Module({
  imports: [
    MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]) 
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductInterceptors],
})
export class ProductsModule {}
