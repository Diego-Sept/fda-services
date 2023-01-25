import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

    @OneToOne( () => Role)
    @JoinColumn()
    role: Role;

    @OneToOne( () => Client)
    @JoinColumn()
    client: Client;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
