import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductTypeNotFound extends HttpException {
  constructor() {
    super(
      'El tipo de proveedor debe ser mayorista o minorista',
      HttpStatus.BAD_REQUEST,
    );
  }
}
