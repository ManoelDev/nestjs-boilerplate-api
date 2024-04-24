import { Either, right } from '@/shared/either';
import { UniqueEntityID } from '@/shared/entity/unique-entity-id';
import { Injectable } from '@nestjs/common';

import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications.repository';

interface Input {
  recipientId: string;
  title: string;
  content: string;
}

type Output = Either<null, { notification: Notification }>;

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ recipientId, title, content }: Input): Promise<Output> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    });

    await this.notificationsRepository.create(notification);

    return right({ notification });
  }
}
