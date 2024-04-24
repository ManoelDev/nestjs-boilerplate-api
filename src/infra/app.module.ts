import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { environmentSchema } from './environment/environment';
import { EnvironmentModule } from './environment/environment.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './http/auth/auth.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => environmentSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvironmentModule,
    EventsModule,
  ],
})
export class AppModule {}
