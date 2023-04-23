import { Client } from "src/clients/entities/client.entity";
import { Due } from "src/dues/entities/due.entity";
import { Event } from "src/events/entities/event.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "paymentsplan"
})
export class PaymentPlan {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    clientId: number;

    @ManyToOne(() => Client, (client) => { client.id })
    client: Client;

    @Column()
    eventId: number;

    @ManyToOne(() => Event, (event) => { event.id })
    event: Event;

    @OneToMany(() => Due, (due) => due.paymentPlan)
    dues: Due[];

}
