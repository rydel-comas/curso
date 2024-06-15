import { HttpException, HttpStatus } from "@nestjs/common";

export class ProviderTypeNotFound extends HttpException {

  constructor() {
    super('El tipo de proveedor debe ser mayorista o minorista', HttpStatus.BAD_REQUEST)
  }
}