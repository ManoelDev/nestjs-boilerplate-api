import { OnAccountCreated } from '@/app/notification/subscribers/on-account-created';
import { OnAccountUpdate } from '@/app/notification/subscribers/on-account-updatey';
import { SendMailNotificationUseCase } from '@/app/notification/use-cases/send-mail-notification.use-case';
import { SendNotificationUseCase } from '@/app/notification/use-cases/send-notification.use-case';
import { SendSMSNotificationUseCase } from '@/app/notification/use-cases/send-sms-notification.use-case';
import { Module } from '@nestjs/common';

import { DataBaseModule } from '../database/database.module';

@Module({
  imports: [DataBaseModule],
  providers: [OnAccountCreated, OnAccountUpdate, SendNotificationUseCase, SendMailNotificationUseCase, SendSMSNotificationUseCase],
})
export class EventsModule {}
