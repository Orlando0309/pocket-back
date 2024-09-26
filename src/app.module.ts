import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { LinksModule } from './links/links.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Génère le schéma GraphQL automatiquement
      context: ({ req }) => ({ req }), // Pour accéder aux informations de la requête dans les résolveurs
      playground: true,
    }),
    PrismaModule,
    UserModule,
    LinksModule,
    TagModule,
    // Importer les autres modules ici
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
