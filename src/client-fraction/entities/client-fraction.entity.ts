import { Client } from "src/clients/entities/client.entity";
import { Fraction } from "src/fractions/entities/fraction.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'clientfraction'
})
export class ClientFraction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    clientId: number;
    
    @ManyToOne(() => Client, (client) => client.id)
    client: Client;

    @Column()
    fractionId: number;

    @ManyToOne(() => Fraction, (fraction) => fraction.id)
    fraction: Fraction;

}
