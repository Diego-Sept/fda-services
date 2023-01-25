
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';

@Entity({
    name: 'contacts'
})
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    mainContact: boolean;

    @ManyToOne(() => Client, (client) => client.id)
    client: Client;

}
