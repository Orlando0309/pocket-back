import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { req } = ctx;
    if (!req.headers.authorization) {
      throw new UnauthorizedException('No authorization header');
    }
    // Implémenter la logique d'authentification personnalisée ici
    const user = this.validateToken(req.headers.authorization);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    ctx.user = user; // Attacher l'utilisateur au contexte
    return true;
  }

  validateToken(token: string) {
    try {
      return this.auth.verifyCredentials(token);
    } catch (error) {
      throw error;
    }
  }
}
