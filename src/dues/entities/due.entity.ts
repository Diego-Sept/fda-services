import { PaymentPlan } from "src/payment-plan/entities/payment-plan.entity";
import { Payment } from "src/payments/entities/payment.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "dues"
})
export class Due {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PaymentPlan, (paymentPlan) => paymentPlan.dues)
    paymentPlan: PaymentPlan;

    @Column()
    expirationDate: Date;

    @Column()
    amount: number;

    @OneToMany(() => Payment, (payment) => payment.due)
    payments: Payment[];

}
