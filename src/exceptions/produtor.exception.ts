import { HttpException, HttpStatus } from '@nestjs/common';

export class ProdutorNotFoundException extends HttpException {
  constructor() {
    super('Produtor não encontrado.', HttpStatus.NOT_FOUND);
  }
}

export class ProdutorBadRequestException extends HttpException {
  constructor(message = '') {
    super('Verifique os dados enviados. ' + message, HttpStatus.BAD_REQUEST);
  }
}
