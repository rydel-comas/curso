import {
  Injectable,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { ProductsService } from '../../products/products.service';
import { ProductAlreadyExistsException } from '@exceptions/products-already-exists';

@Injectable()
export class ProductInterceptors implements NestInterceptor {
  constructor(private productsService: ProductsService) {}

  /**
   * Intercepts the incoming request and performs validation to check if a product with the same name already exists.
   * If a product with the same name exists, throws a ProductAlreadyExistsException.
   * Otherwise, allows the request to proceed.
   *
   * @param context - The execution context of the incoming request.
   * @param next - The next call handler in the chain.
   * @returns A promise that resolves to an observable of the next call handler.
   */
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<CallHandler>> {
    const provider = await this.productsService.findByName(
      context.getArgs()[0].body.name,
    );
    if (provider) {
      return throwError(() => new ProductAlreadyExistsException());
    }
    return next.handle();
  }
}
