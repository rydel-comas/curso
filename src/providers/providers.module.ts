import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Provider, ProviderSchema } from './schemas/provider.schema';
import { ProviderInterceptors } from 'src/common/interceptors/providers.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Provider.name, schema: ProviderSchema}])
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService, ProviderInterceptors]
})
export class ProvidersModule {}
