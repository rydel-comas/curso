import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Provider } from './schemas/provider.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel(Provider.name) private readonly providerModel: Model<Provider>,
  ) {}

  create(createProviderDto: CreateProviderDto, createBy: string) {
    const createProviders = new this.providerModel({
      ...createProviderDto,
      createBy,
    });
    return createProviders.save();
  }

  async findAll() {
    const providers = await this.providerModel.find().exec();
    return providers;
  }

  async findOne(id: string) {
    const providers = await this.providerModel.findById(id).exec();
    return providers ? providers.toObject() : null;
  }

  async findByName(name: string) {
    const providers = await this.providerModel
      .findOne({ name: { $regex: `^${name}$`, $options: 'i' } })
      .exec();
    return providers ? providers.toObject() : null;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const updatedProviders = await this.providerModel.findByIdAndUpdate(
      id,
      updateProviderDto,
    );
    return updatedProviders ? updatedProviders.toObject() : null;
  }

  async remove(id: string) {
    await this.providerModel.findByIdAndDelete(id).exec();
  }
}
