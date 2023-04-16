import { Client } from "src/clients/entities/client.entity";
import { EventType } from "src/event-types/entities/event-type.entity";
import { Fraction } from "src/fractions/entities/fraction.entity";
import { Saloon } from "src/saloons/entities/saloon.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'budgets'
})
export class Budget {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    createdAt: Date;

    @Column()
    stateId: number;

    @Column({nullable: true})
    clientId: number;
    
    @ManyToOne(() => Client, (client) => client.id)
    client: Client;

    @Column({nullable: true})
    fractionId: number;

    @ManyToOne(() => Fraction, (fraction) => fraction.id)
    fraction: Fraction;

    @Column()
    amount: number;

    @ManyToOne(() => Saloon, (saloon) => saloon.id)
    saloon: Saloon;

    @Column()
    saloonId: number;

    @ManyToOne(() => EventType, (eventType) => eventType.id)
    eventType: EventType;

    @Column()
    eventTypeId: number;

    @Column()
    expirationDate: Date;

}
