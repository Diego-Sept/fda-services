import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Client } from '../../clients/entities/client.entity';
import * as bcrypt from 'bcrypt';

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @ManyToOne( () => Role, (role) => role.id)
    @JoinColumn()
    role: Role;

    @OneToOne( () => Client, (client) => client.id)
    @JoinColumn()
    client: Client;

    @Column()
    clientId: number;

    @Column()
    roleId: number;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
