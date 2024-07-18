import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDto } from './dtos/user.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { getYearTimestamps } from 'src/common/utils';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { UserPageOptionsDto } from './dtos/user-page-options.dto';
import { UiUserRegisterDto } from '../ui-auth/dtos/UiUserRegisterDto';
import { FindOptionsWhere, Repository, SelectQueryBuilder } from 'typeorm';
import { UserAlreadyExistsException } from 'src/exceptions/user/user-already-exists.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  @Transactional()
  async createUser(userRegisterDto: UiUserRegisterDto): Promise<UserEntity> {
    const isExists = await this.userRepository.findOne({
      where: { email: userRegisterDto.email },
    });

    if (isExists) throw new UserAlreadyExistsException();

    const user = this.userRepository.create(userRegisterDto);
    const createdUser = await this.userRepository.save(user);

    return createdUser;
  }

  findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: findData,
    });
  }

  async getAllUsers(
    userPageOptionDto: UserPageOptionsDto,
  ): Promise<PageDto<UserDto>> {
    const { q } = userPageOptionDto;

    const queryBuilder = this.userRepository.createQueryBuilder('users');

    // search users by firstName, lastName or age
    if (q && q.length) {
      await this.searchUsers(q, userPageOptionDto, queryBuilder);
    }
    const [items, pageMetaDto] = await queryBuilder.paginate(userPageOptionDto);

    return items.toPageDto(pageMetaDto);
  }

  private async searchUsers(
    q: string,
    userPageOptionDto: UserPageOptionsDto,
    queryBuilder: SelectQueryBuilder<UserEntity>,
  ) {
    const searchTerm = q.toLowerCase().trim();

    const searchTerms = searchTerm.split(' ');

    if (searchTerms.length > 3) {
      return {
        data: [],
        meta: new PageMetaDto({
          pageOptionsDto: userPageOptionDto,
          itemCount: 0,
        }),
      };
    }

    let firstName: string | undefined;
    let lastName: string | undefined;
    let age: number | undefined;

    for (const term of searchTerms) {
      if (!isNaN(Number(term))) {
        age = Number(term);
      } else {
        if (!firstName) {
          firstName = term;
        } else {
          lastName = term;
        }
      }
    }

    if (firstName && lastName) {
      const [firstName, lastName] = searchTerms;
      queryBuilder.andWhere(
        `(LOWER(users.firstName) LIKE :firstName AND LOWER(users.lastName) LIKE :lastName) OR
        (LOWER(users.firstName) LIKE :lastName AND LOWER(users.lastName) LIKE :firstName)`,
        {
          firstName: `%${firstName}%`,
          lastName: `%${lastName}%`,
        },
      );
    } else if (firstName) {
      queryBuilder.andWhere(
        '(LOWER(users.firstName) LIKE :searchParam OR LOWER(users.lastName) LIKE :searchParam)',
        { searchParam: `%${firstName}%` },
      );
    }

    if (age) {
      const dateRange = getYearTimestamps(age);
      const { start, end } = dateRange;
      queryBuilder.andWhere('users.dateOfBirth BETWEEN :start AND :end', {
        start,
        end,
      });
    }
  }
}
