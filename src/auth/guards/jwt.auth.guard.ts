import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core'
import { PUBLIC_KEY } from 'src/constants';
import { AuthService } from '../services/auth.service';
// import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector
  ) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler())
    if (isPublic) return true

    let req = (context.getType().toString() === 'graphql') ?
      'GqlExecutionContext.create(context).getContext().req' :
      context.switchToHttp().getRequest()

    if(!req.headers.authorization) throw new UnauthorizedException('Invalid token')
    const token = req.headers.authorization.replace('Bearer ', '')

    if (!token || Array.isArray(token)) throw new UnauthorizedException('Invalid token')
    const manageToken = await this.authService.decode(token)

    if (typeof manageToken === 'string') throw new UnauthorizedException(manageToken)

    req.user = manageToken

    return true;
  }
}
