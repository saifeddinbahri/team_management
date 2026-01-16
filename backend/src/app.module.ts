import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './config/typeorm.conf';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './config/env.conf';
import { RepositoryModule } from './modules/repository/repository.module';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './resolvers/app/app.resolver';
import { TeamModule } from './modules/team/team.module';
import { FastifyRequest } from 'fastify';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    ConfigModule.forRoot(configModuleOptions),
    RepositoryModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/tms-api',
      context: ({ req }: { req: FastifyRequest }) => ({ req }),
    }),
    TeamModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
