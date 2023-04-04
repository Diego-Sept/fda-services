import { Injectable, Logger, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
import { ProductsService } from '../products/products.service';
import { StoresService } from 'src/stores/stores.service';
import { Product } from '../products/entities/product.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Store } from '../stores/entities/store.entity';

@Injectable()
export class StockService {

	private readonly logger = new Logger(StockService.name);

	constructor(
		@InjectRepository(Stock)
		private stockRepository: Repository<Stock>,
		@Inject(forwardRef(() => ProductsService))
		private productsService: ProductsService,
		@Inject(forwardRef(() => StoresService))
		private storesService: StoresService
	) { }

	async create(createStockDto: CreateStockDto) {
		if (!!createStockDto.productId) {
			let product: Product = await this.productsService.findOne(createStockDto.productId);
			if (!product) {
				throw new BadRequestException("No product found with id " + createStockDto.productId);
			}
		} else {
			throw new BadRequestException("The productId must be sended.");
		}
		if (!!createStockDto.storeId) {
			let store: Store = await this.storesService.findOne(createStockDto.storeId);
			if (!store) {
				throw new BadRequestException("No store found with id " + createStockDto.storeId);
			}
		} else {
			throw new BadRequestException("The storeId must be sended.");
		}
		if (!createStockDto.quantity || createStockDto.quantity < 0) {
			throw new BadRequestException("The quantity must be positive or 0.");
		}

		let stockCreated : Stock = await this.stockRepository.save(createStockDto);
		return await this.getStock(stockCreated);
	}

	async findAll() {
		let stockList: Stock[] = await this.stockRepository.find();

		for (let stock of stockList) {
			await this.getStock(stock);
		}

		return stockList;
	}

	async findOne(id: number) {
		return this.stockRepository.findOneBy({ id: id }).then(async stock => {
			return await this.getStock(stock);
		})
	}

	async update(id: number, updateStockDto: UpdateStockDto) {
		if (!!updateStockDto.quantity && updateStockDto.quantity >= 0){
			let stock : Stock = await this.stockRepository.findOneBy({ id: id });
			if (!!stock){
				stock.quantity = updateStockDto.quantity;
				stock = await this.stockRepository.save(stock);
				return await this.getStock(stock);
			} else {
				throw new BadRequestException("No stock found with id " + id);
			}
		} else {
			throw new BadRequestException("The quantity must be positive or 0.");
		}
	}

	remove(id: number) {
		return this.stockRepository.delete(id);
	}

	async getStock(stock: Stock) {
		let product: Product = await this.productsService.findOne(stock.productId);
		stock.product = product;
		let store: Store = await this.storesService.findOne(stock.storeId);
		stock.store = store;
		return stock;
	}
}
