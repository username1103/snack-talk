import { ICodeName } from '@app/entity/enum/ICodeName';
import { EnumType } from 'ts-jenum';

export class NotificationStatus
  extends EnumType<NotificationStatus>()
  implements ICodeName<NotificationStatus>
{
  static readonly ON = new NotificationStatus('ON', '활성');

  static readonly OFF = new NotificationStatus('OFF', '비활성');

  constructor(private readonly _code: string, private readonly _name: string) {
    super();
  }

  get code() {
    return this._code;
  }

  get name() {
    return this._name;
  }

  equals(v: NotificationStatus): boolean {
    return this._code === v._code;
  }
}
