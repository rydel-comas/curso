import { HttpException, HttpStatus } from "@nestjs/common";

export class ProviderAlreadyExistsException extends HttpException {

  constructor() {
    super('Provider already exists', HttpStatus.BAD_REQUEST)
  }
}