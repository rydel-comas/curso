import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Provider } from './schemas/provider.schema';
import { Model } from 'mongoose';
import { ProviderTypeNotFound } from 'src/common/exceptions/provider-type-not-found';
import { EtypeProvider } from './type.providers.enum'
@Injectable()
export class ProvidersService {

  constructor(@InjectModel(Provider.name) private readonly providerModel: Model<Provider>) {}

  create(createProviderDto: CreateProviderDto, createBy: string) {
    
    if(!Object.values(EtypeProvider).includes(createProviderDto.type as EtypeProvider)) { //PRINCIO, SOLID, 
      throw new ProviderTypeNotFound();
    }
    const createProviders = new this.providerModel({...createProviderDto, createBy});
    return createProviders.save()
  }

  async findAll() {
    const providers = await this.providerModel.find().exec();
    return providers;
  }

  async findOne(id: string) {
    const providers =  await this.providerModel.findById(id).exec();
    return providers ? providers.toObject(): null;
  }

  async findByName(name: string) {
    const providers =  await this.providerModel.findOne({'name': {'$regex': `^${name}$`, $options: 'i'}}).exec();
    return providers ? providers.toObject(): null;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    if (updateProviderDto.type) {
      if(!Object.values(EtypeProvider).includes(updateProviderDto.type as EtypeProvider)) { //PRINCIO, SOLID, 
        throw new ProviderTypeNotFound();
      }
    }
    const updatedProviders = await this.providerModel.findByIdAndUpdate(id, 
      updateProviderDto
    );
    return updatedProviders ? updatedProviders.toObject() : null;
  }

  async remove(id: string) {
    await this.providerModel.findByIdAndDelete(id).exec();
  }
}
