import { forwardRef, Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ContactsModule } from '../contacts/contacts.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    ContactsModule,
    UsersModule
  ],
  controllers: [ClientsController],
  providers: [
    ClientsService,
  ],
  exports: [
    TypeOrmModule,
    ClientsService
  ]
})
export class ClientsModule {}
