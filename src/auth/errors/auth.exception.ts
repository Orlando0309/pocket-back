import { ForbiddenException } from '@nestjs/common';
export class UnknownUser extends ForbiddenException {
  constructor(state: number) {
    if (state == 0) {
      super('Your account does not exist');
    } else if (state == 1) {
      super('Password incorrect');
    } else if (state == 2) {
      super('Your not allowed');
    } else if (state == 3) {
      super('Session expired');
    } else {
      super('Unkown user');
    }
  }
}

export const authSTATE = {
  UNKNOWN_USER: 0,
  PASSWORD_INVALID: 1,
  NOT_ALLOWED: 2,
  SESSION_EXPIRED: 3,
};
