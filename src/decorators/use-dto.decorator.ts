import { Constructor } from 'src/types';

import { AbstractDto } from 'src/common/dtos/abstract.dto';
import type { AbstractEntity } from '../common/abstract.entity';

export function UseDto(
  dtoClass: Constructor<AbstractDto, [AbstractEntity, unknown]>,
): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
