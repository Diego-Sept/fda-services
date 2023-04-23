import { Budget } from "src/budgets/entities/budget.entity";
import { Client } from "src/clients/entities/client.entity";
import { EventState } from "src/event-states/entities/event-state.entity";
import { EventType } from "src/event-types/entities/event-type.entity";
import { Fraction } from "src/fractions/entities/fraction.entity";
import { Saloon } from "src/saloons/entities/saloon.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'events'
})
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Saloon, (saloon) => saloon.id)
    saloon: Saloon;

    @Column()
    saloonId: number;

    @ManyToOne(() => EventType, (eventType) => eventType.id)
    eventType: EventType;

    @Column()
    eventTypeId: number;

    @Column({nullable: true})
    clientId: number;
    
    @ManyToOne(() => Client, (client) => client.id)
    client: Client;

    @Column({nullable: true})
    fractionId: number;

    @ManyToOne(() => Fraction, (fraction) => fraction.id)
    fraction: Fraction;

    @ManyToOne(() => EventState, (eventState) => { eventState.id })
    state: EventState;

    @Column()
    stateId: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    guestsQuantity: number;

    @Column()
    observations: string;

}