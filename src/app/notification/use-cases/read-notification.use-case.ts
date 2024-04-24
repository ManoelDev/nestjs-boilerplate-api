import { Either, left, right } from '@/shared/either';
import { NotAllowedError } from '@/shared/error/not-allowed-error';
import { ResourceNotFoundError } from '@/shared/error/resource-not-found-error';
import { Injectable } from '@nestjs/common';

import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications.repository';

interface Input {
  recipientId: string;
  notificationId: string;
}

type Output = Either<ResourceNotFoundError | NotAllowedError, { notification: Notification }>;

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ recipientId, notificationId }: Input): Promise<Output> {
    const notification = await this.notificationsRepository.findById(notificationId);
    if (!notification) return left(new ResourceNotFoundError());
    if (recipientId !== notification.recipientId.toString()) return left(new NotAllowedError());

    notification.read();
    await this.notificationsRepository.save(notification);

    return right({ notification });
  }
}
