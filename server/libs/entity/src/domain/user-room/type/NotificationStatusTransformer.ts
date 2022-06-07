import { ValueTransformer } from 'typeorm';
import { NotificationStatus } from './NotificationStatus';

export class NotificationStatusTransformer implements ValueTransformer {
  to(value: NotificationStatus) {
    if (!value) {
      return null;
    }

    return value.enumName;
  }
  from(value: any) {
    if (!value) {
      return null;
    }

    return NotificationStatus.valueByName(value);
  }
}
