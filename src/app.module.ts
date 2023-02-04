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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'fda',
      entities: [
          Client,
          Contact,
          User,
          Role,
          Product,
          Store
      ],
      synchronize: true,
    }),
    ClientsModule,
    ContactsModule,
    UsersModule,
    RolesModule,
    ProductsModule,
    StoresModule,
    StockModule,
    FractionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule{
}
