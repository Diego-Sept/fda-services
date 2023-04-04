import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Stock } from './entities/stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresService } from 'src/stores/stores.service';
import { ProductsService } from 'src/products/products.service';
import { StoresModule } from '../stores/stores.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock]),
    StoresModule,
    ProductsModule
  ],
  controllers: [StockController],
  providers: [StockService],
  exports:[
    TypeOrmModule,
    StockService
  ]
})
export class StockModule {}
