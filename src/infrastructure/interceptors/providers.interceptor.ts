import {
  Injectable,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { ProvidersService } from '../../providers/providers.service';
import { ProviderAlreadyExistsException } from '@exceptions/provider-already-exists';

@Injectable()
export class ProviderInterceptors implements NestInterceptor {
  constructor(private providersService: ProvidersService) {}

  /**
   * Intercepts the incoming request and checks if a provider with the same name already exists.
   * If a provider with the same name exists, throws a ProviderAlreadyExistsException.
   * Otherwise, allows the request to proceed.
   *
   * @param context - The execution context of the request.
   * @param next - The next call handler in the chain.
   * @returns A promise that resolves to an observable of the next call handler.
   */
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<CallHandler>> {
    const provider = await this.providersService.findByName(
      context.getArgs()[0].body.name,
    );
    if (provider) {
      return throwError(() => new ProviderAlreadyExistsException());
    }
    return next.handle();
  }
}
