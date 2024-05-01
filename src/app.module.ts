import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as EOS_SCHEMA from 'drizzle/eos/schema/schema';
import * as LAKEMASTER_SCHEMA from 'drizzle/lakemaster/schema/schema';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';

@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      tag: 'EOS',
      useFactory() {
        return {
          postgres: {
            url: process.env.EOS_DATABASE_URL,
          },
          config: {
            schema: { ...EOS_SCHEMA },
          },
        };
      },
    }),
    DrizzlePostgresModule.registerAsync({
      tag: 'LAKEMASTER',
      useFactory() {
        return {
          postgres: {
            url: process.env.LAKEMASTER_DATABASE_URL,
          },
          config: {
            schema: { ...LAKEMASTER_SCHEMA },
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
