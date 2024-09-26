import { Injectable } from '@nestjs/common';
import { SignInUserInput } from './dto/signIn-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { authSTATE, UnknownUser } from './errors/auth.exception';
import utils from 'src/utils/utils';
import * as moment from 'moment';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async verifyCredentials(token: string) {
    const find = await this.prisma.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!find) {
      throw new UnknownUser(authSTATE.NOT_ALLOWED);
    }
    if (find.expired_at < new Date()) {
      throw new UnknownUser(authSTATE.SESSION_EXPIRED);
    }
    return find;
  }
  async signIn(user: SignInUserInput) {
    const find = await this.prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (!find) {
      throw new UnknownUser(authSTATE.UNKNOWN_USER);
    }
    const hash = utils.hash(user.password);
    if (hash === find.password) {
      // generate token here
      const token = utils.generateToken();
      try {
        const updated = await this.prisma.user.update({
          where: { id: find.id },
          data: {
            expired_at: moment().add(1, 'days').toDate(),
            token,
          },
        });
        if (updated) {
          return { token };
        }
      } catch (error) {
        throw error;
      }
    }
  }
}
