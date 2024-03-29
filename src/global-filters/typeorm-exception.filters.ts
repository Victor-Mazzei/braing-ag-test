import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import {
  QueryFailedError,
  EntityNotFoundError,
  CannotCreateEntityIdMapError,
} from 'typeorm';
import { Response } from 'express';
import { UNIQUE_CPF_CNPJ_KEY } from 'src/constants/TypeOrmCode';

@Catch(QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | QueryFailedError
      | EntityNotFoundError
      | CannotCreateEntityIdMapError,
    host: ArgumentsHost,
  ) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const code: number = (exception as any).code;
    const errorResponse = {
      message:
        code && code == UNIQUE_CPF_CNPJ_KEY
          ? 'CPF/CNPJ já cadastrado'
          : 'Erro interno do servidor, aguarde um momento e tente novamente, se persistir entre em contato com o adminitrador do sistema',
      timestamp: new Date().toISOString(),
    };

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}
