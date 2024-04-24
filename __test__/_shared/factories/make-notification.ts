import { Notification, NotificationProps } from '@/app/notification/entities/notification';
import { UniqueEntityID } from '@/shared/entity/unique-entity-id';
import { faker } from '@faker-js/faker';

export function makeNotification(override: Partial<NotificationProps> = {}) {
  const notification = Notification.create({
    recipientId: new UniqueEntityID(),
    title: faker.lorem.sentence(4),
    content: faker.lorem.sentence(10),
    ...override,
  });

  return notification;
}
