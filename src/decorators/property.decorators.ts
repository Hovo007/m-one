import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { getVariableName } from 'src/common/utils';

export function ApiEnumProperty<TEnum>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, 'type'> & { each?: boolean } = {},
): PropertyDecorator {
  const enumValue = getEnum() as any;

  return ApiProperty({
    type: 'enum',
    enum: enumValue,
    enumName: getVariableName(getEnum),
    ...options,
  });
}
