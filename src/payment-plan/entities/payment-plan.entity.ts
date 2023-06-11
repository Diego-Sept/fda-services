import { Budget } from "src/budgets/entities/budget.entity";
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
    title: string;

    @Column()
    clientId: number;

    @ManyToOne(() => Client, (client) => { client.id })
    client: Client;

    @Column()
    budgetId: number;

    @ManyToOne(() => Budget, (budget) => { budget.id })
    budget: Budget;

    @OneToMany(() => Due, (due) => due.paymentPlan)
    dues: Due[];

}
