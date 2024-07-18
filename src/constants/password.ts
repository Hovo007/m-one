export enum Password {
  REGEX = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$',
  MIN_LENGTH = 6,
}
