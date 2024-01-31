import { HttpException, HttpStatus } from '@nestjs/common';

export class ProdutorNotFoundException extends HttpException {
  constructor() {
    super('Produtor não encontrado.', HttpStatus.NOT_FOUND);
  }
}

export class ProdutorBadRequestException extends HttpException {
  constructor() {
    super('Verifique os dados enviados.', HttpStatus.BAD_REQUEST);
  }
}
