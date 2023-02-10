import { Product } from "src/products/entities/product.entity";
import { Store } from "src/stores/entities/store.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'stock'
})
export class Stock {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.id)
    product: Product;

    @ManyToOne(() => Store, (store) => store.id)
    store: Store;

    @Column()
    quantity: number;
}
