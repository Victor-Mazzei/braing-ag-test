import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config';
import { CulturasModule } from './culturas/culturas.module';
import { ProdutoresModule } from './produtores/produtores.module';
import { FazendasModule } from './fazendas/fazendas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    ProdutoresModule,
    FazendasModule,
    CulturasModule,
  ],
})
export class AppModule {}
