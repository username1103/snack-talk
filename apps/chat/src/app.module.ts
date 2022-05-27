import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { AppController } from './app.controller';
import { EventModule } from './event/event.module';

@Module({
  imports: [EventModule, AppConfigModule],
  controllers: [AppController],
  providers: [],
})
export class ChatAppModule {}
