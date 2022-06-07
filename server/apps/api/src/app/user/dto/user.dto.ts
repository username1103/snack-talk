import { User } from '@app/entity/domain/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Exclude() private _id: number;
  @Exclude() private _name: string;
  @Exclude() private _email: string;

  private constructor() {}

  static of(user: User) {
    const dto = new UserDto();
    dto._id = user.id;
    dto._email = user.email;
    dto._name = user.name;

    return dto;
  }

  @Expose()
  @ApiProperty({ example: 1 })
  get id(): number {
    return this._id;
  }

  @Expose()
  @ApiProperty({ example: 'tester001' })
  get name(): string {
    return this._name;
  }

  @Expose()
  @ApiProperty({ example: 'test@test.com' })
  get email(): string {
    return this._email;
  }
}
