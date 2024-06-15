import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JWTPayload } from '../../auth/interfaces/jwt.payload';

/**
 * Custom decorator that retrieves the authenticated user from the request object.
 * @param data - Additional data passed to the decorator (not used in this implementation).
 * @param ctx - The execution context containing the request object.
 * @returns The authenticated user extracted from the request object.
 * @throws ForbiddenException if there is an error retrieving the user from the request object.
 */
export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Partial<JWTPayload> => {
    try {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    } catch (error) {
      throw new ForbiddenException();
    }
  },
);
