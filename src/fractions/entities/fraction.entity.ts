import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'fractions'
})
export class Fraction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}