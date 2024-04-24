import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'
import { PUBLIC_KEY, ROLES, ROLES_KEY } from 'src/constants';
// import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler())
    if (isPublic) return true

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(ROLES_KEY, context.getHandler())

    const req = (context.getType().toString() === 'graphql') ?
      'GqlExecutionContext.create(context).getContext().req' :
      context.switchToHttp().getRequest()

    if (req.user.role === ROLES.ADMIN) return true

    if (roles === undefined) throw new UnauthorizedException('You are not authorized to perform this operation')

    const isAuth = roles.some((role) => role === req.user.role)
    if (!isAuth) throw new UnauthorizedException('You are not authorized to perform this operation')
    return true;
  }
}
