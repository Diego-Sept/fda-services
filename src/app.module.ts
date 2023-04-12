import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { ContactsModule } from './contacts/contacts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './clients/entities/client.entity';
import { Contact } from './contacts/entities/contact.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { StockModule } from './stock/stock.module';
import { FractionsModule } from './fractions/fractions.module';
import { Product } from './products/entities/product.entity';
import { Store } from './stores/entities/store.entity';
import { ClientFractionModule } from './client-fraction/client-fraction.module';
import { Stock } from './stock/entities/stock.entity';
import { Fraction } from './fractions/entities/fraction.entity';
import { ClientFraction } from './client-fraction/entities/client-fraction.entity';
import { EventTypesModule } from './event-types/event-types.module';
import { SaloonsModule } from './saloons/saloons.module';
import { BudgetsModule } from './budgets/budgets.module';
import { Saloon } from './saloons/entities/saloon.entity';
import { EventType } from './event-types/entities/event-type.entity';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { Budget } from './budgets/entities/budget.entity';
import { Event } from './events/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'fda',
      entities: [
          Client,
          Contact,
          User,
          Role,
          Product,
          Store,
          Stock,
          EventType,
          Saloon,
          Fraction,
          ClientFraction,
          Budget,
          Event
      ],
      synchronize: true,
      migrationsRun: false
    }),
    ClientsModule,
    ContactsModule,
    UsersModule,
    RolesModule,
    ProductsModule,
    StoresModule,
    StockModule,
    FractionsModule,
    ClientFractionModule,
    EventTypesModule,
    SaloonsModule,
    BudgetsModule,
    AuthModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule{
}
