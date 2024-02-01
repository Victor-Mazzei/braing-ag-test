import { HttpException, HttpStatus } from '@nestjs/common';

export class FazendaNotFoundException extends HttpException {
  constructor() {
    super('Fazenda não encontrada.', HttpStatus.NOT_FOUND);
  }
}

export class FazendaBadRequestException extends HttpException {
  constructor(message = '') {
    super('Verifique os dados enviados.' + message, HttpStatus.BAD_REQUEST);
  }
}

export class FazendaValidationException extends HttpException {
  constructor() {
    super(
      'Área ágricutável e vegetação maior que a area total da fazenda.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
