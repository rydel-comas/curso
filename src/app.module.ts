import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProvidersModule } from './providers/providers.module';
import { ProductsModule } from './products/products.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true, // hace que el modulo de configuración sea global, es accesible en cualquier módulo sin necesidad de importalo nuevamente
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
    })
  }),
  UsersModule,
  AuthModule,
  ProvidersModule,
  ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
