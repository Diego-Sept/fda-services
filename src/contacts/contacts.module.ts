import { Module, forwardRef } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { Contact } from './entities/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '../clients/clients.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
    forwardRef(() => ClientsModule)
  ],
  controllers: [ContactsController],
  providers: [
    ContactsService,
  ],
  exports: [
    TypeOrmModule,
    ContactsService
  ]
})
export class ContactsModule {}
