import { Injectable } from '@nestjs/common';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { ProductsService } from '../../products/products.service';
import { ProductAlreadyExistsException } from 'src/common/exceptions/products-already-exists';
@Injectable()
export class ProductInterceptors implements NestInterceptor {
    constructor(private productsService: ProductsService) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<CallHandler>> {
        const provider = await this.productsService.findByName(context.getArgs()[0].body.name);
        if (provider) {
            return throwError(() => new ProductAlreadyExistsException);
        }
        return next.handle();
    }
}
