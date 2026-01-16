import { Catch, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException) {
    const statusCode = exception.getStatus();
    const errorResponse = exception.getResponse();

    let message = 'Internal server error';

    if (typeof errorResponse === 'string') {
      message = errorResponse;
    } else if (this.isErrorResponseObject(errorResponse)) {
      message = errorResponse.message;
    }

    return new HttpException(
      {
        success: false,
        statusCode,
        message,
      },
      statusCode,
    );
  }

  private isErrorResponseObject(
    errorResponse: unknown,
  ): errorResponse is { message: string } {
    return (
      typeof errorResponse === 'object' &&
      errorResponse !== null &&
      'message' in errorResponse &&
      typeof (errorResponse as { message?: unknown }).message === 'string'
    );
  }
}
