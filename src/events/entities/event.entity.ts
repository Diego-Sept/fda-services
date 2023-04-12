import { Budget } from "src/budgets/entities/budget.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'events'
})
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Budget, (budget) => { budget.id })
    budget: Budget;

    @Column()
    budgetId: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    guestsQuantity: number;

    @Column()
    observations: string;

}