import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "eventstates"
})
export class EventState {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    state: string;

}
