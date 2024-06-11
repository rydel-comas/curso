import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { EtypeProducts } from './type.products.enum'
import { ProductTypeNotFound } from 'src/common/exceptions/product-not-found';

@Injectable()
export class ProductsService {
  
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  create(createProductDto: CreateProductDto, createBy) {
    if(!Object.values(EtypeProducts).includes(createProductDto.type as EtypeProducts)) { //PRINCIO, SOLID, 
      throw new ProductTypeNotFound();
    }
    const createProvider = new this.productModel({...createProductDto, createBy});
    return createProvider.save()
  }

  async findAll() {
    const producs = await this.productModel.find().exec();
    return producs;
  }

  async findOne(id: string) {
    const products =  await this.productModel.findById(id).exec();
    return products ? products.toObject(): null;
  }

  async findByName(name: string) {
    const products =  await this.productModel.findOne({'name': {'$regex': `^${name}$`, $options: 'i'}}).exec();
    return products ? products.toObject(): null;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (updateProductDto.type) {
      if(!Object.values(EtypeProducts).includes(updateProductDto.type as EtypeProducts)) { //PRINCIO, SOLID, 
        throw new ProductTypeNotFound();
      }
    }
    const updatedProducts = await this.productModel.findByIdAndUpdate(id, 
      updateProductDto
    );
    return updatedProducts ? updatedProducts.toObject() : null;
  }

  async remove(id: string) {
    console.log(id)
    await this.productModel.findByIdAndDelete(id).exec();
  }
}
