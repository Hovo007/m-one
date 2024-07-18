import { Column, DeleteDateColumn, Entity } from 'typeorm';

import { UseDto } from 'src/decorators';
import { GenderEnum } from 'src/enums/gender.enum';
import { UserDto } from 'src/modules/user/dtos/user.dto';
import { UserStatusEnum } from 'src/enums/user-status.enum';
import { AbstractEntity, IAbstractEntity } from 'src/common/abstract.entity';

export interface IUserEntity extends IAbstractEntity<UserDto> {
  firstName?: string;

  lastName?: string;

  email?: string;

  password?: string;

  phone?: string;

  isAvtive?: boolean;

  gender?: string;

  dateOfBirth?: string;
}

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto> implements IUserEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: false, default: false })
  isAvtive?: boolean;

  @Column({ type: 'enum', enum: UserStatusEnum, default: null, nullable: true })
  status: UserStatusEnum;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: null,
    nullable: true,
  })
  gender: GenderEnum;

  @Column({ nullable: true, type: 'timestamp', default: null })
  dateOfBirth?: string;

  @DeleteDateColumn({
    name: 'deletedAt',
    nullable: true,
    type: 'timestamp',
  })
  deletedAt: Date | null;
}
