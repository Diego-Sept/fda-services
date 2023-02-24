import { Client } from "src/clients/entities/client.entity";
import { Fraction } from "src/fractions/entities/fraction.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'clientFraction'
})
export class ClientFraction {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Client, (client) => client.id)
    client: Client;

    @ManyToOne(() => Fraction, (fraction) => fraction.id)
    fraction: Fraction;

}
