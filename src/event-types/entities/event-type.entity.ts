import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({
    name: 'eventTypes'
})
export class EventType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
