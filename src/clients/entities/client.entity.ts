import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from '../../contacts/entities/contact.entity';

@Entity({
    name: 'clients'
})
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    identificationNumber: string;

    @Column()
    guestsQuantity: number;

    @OneToMany(() => Contact, (contact) => contact.client)
    contacts: Contact[];

    @Column()
    address: string;

}
