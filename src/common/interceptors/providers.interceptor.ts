import { Injectable } from '@nestjs/common';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { ProvidersService } from '../../providers/providers.service';
import { ProviderAlreadyExistsException } from 'src/common/exceptions/provider-already-exists';
@Injectable()
export class ProviderInterceptors implements NestInterceptor {
    constructor(private providersService: ProvidersService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<CallHandler>> {
        const provider = await this.providersService.findByName(context.getArgs()[0].body.name);
        if (provider) {
            return throwError(() => new ProviderAlreadyExistsException);
        }
        return next.handle();
    }
}
