import { Due } from "src/dues/entities/due.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: "payments"
})
export class Payment {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Due, (due) => due.payments)
    due: Due;

    @Column({ nullable: false })
    paymentId: string;

    @Column()
    paymentMethod: string;

    @Column()
    paymentDate: Date;

    @Column()
    amount: number;

}
