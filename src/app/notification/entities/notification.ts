import { Entity } from '@/shared/entity/entity';
import { UniqueEntityID } from '@/shared/entity/unique-entity-id';
import { Optional } from '@/shared/types/optional';

export interface NotificationProps {
  recipientId: UniqueEntityID;
  title: string;
  content: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification extends Entity<NotificationProps> {
  get recipientId() {
    return this.props.recipientId;
  }
  get title() {
    return this.props.content;
  }
  get content() {
    return this.props.content;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get readAt() {
    return this.props.readAt;
  }

  read() {
    this.props.readAt = new Date();
  }

  static create(props: Optional<NotificationProps, 'readAt' | 'createdAt'>, id?: UniqueEntityID) {
    const notification = new Notification(
      {
        ...props,
        recipientId: props.recipientId ?? new UniqueEntityID(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return notification;
  }
}
