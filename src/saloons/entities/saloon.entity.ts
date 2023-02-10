import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'saloons'
})
export class Saloon {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
