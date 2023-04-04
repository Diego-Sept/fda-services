import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({
    name: 'eventtypes'
})
export class EventType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
