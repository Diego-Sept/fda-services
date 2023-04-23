import { Client } from "src/clients/entities/client.entity";
import { EventState } from "src/event-states/entities/event-state.entity";
import { EventType } from "src/event-types/entities/event-type.entity";
import { Event } from "src/events/entities/event.entity";
import { Fraction } from "src/fractions/entities/fraction.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'budgets'
})
export class Budget {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Event, (event) => { event.id })
    event: Event;

    @Column()
    eventId: number;

    @Column()
    createdAt: Date;

    @Column()
    amount: number;

    @Column()
    expirationDate: Date;

}
