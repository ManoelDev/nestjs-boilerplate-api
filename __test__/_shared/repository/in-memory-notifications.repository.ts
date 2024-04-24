import { Notification } from '@/app/notification/entities/notification';
import { NotificationsRepository } from '@/app/notification/repositories/notifications.repository';

export class InMemoryNotificationsRepository implements NotificationsRepository {
  public items: Notification[] = [];

  async findById(id: string) {
    const account = this.items.find((item) => item.id.toString() === id);
    if (!account) return null;
    return account;
  }

  async create(notification: Notification) {
    this.items.push(notification);
  }

  async save(notification: Notification) {
    const index = this.items.findIndex((item) => item.recipientId === notification.recipientId);
    this.items[index] = notification;
  }
}
