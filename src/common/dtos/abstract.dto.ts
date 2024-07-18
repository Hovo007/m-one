import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from '../abstract.entity';

export class AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(
    entity: AbstractEntity,
    options?: { excludeFields?: boolean; excludeTranslation?: boolean },
  ) {
    if (!options?.excludeFields) {
      this.id = entity.id;
      this.createdAt = entity.createdAt;
      this.updatedAt = entity.updatedAt;
    }
  }
}