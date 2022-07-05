import { ResponseEntity } from '@app/common-config/response/ResponseEntity';
import { applyDecorators, HttpException } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';

export function ApiErrorResponse(...errors: { new (): HttpException }[]) {
  const apiResponses = {};

  errors.forEach((error) => {
    const errorInstance = new error();
    const status = errorInstance.getStatus();
    const response: any = errorInstance.getResponse();
    if (!apiResponses[status]) {
      apiResponses[status] = {
        status,
        content: {
          'application/json': {
            schema: { $ref: getSchemaPath(ResponseEntity) },
            examples: {
              [response.errorCode]: {
                description: response.message,
                value: instanceToPlain(ResponseEntity.ERROR_WITH_DATA(response.message, response.errorCode, response.data)),
              },
            },
          },
        },
      };
    } else {
      apiResponses[status].content['application/json'].examples[response.errorCode] = {
        description: response.message,
        value: instanceToPlain(ResponseEntity.ERROR_WITH_DATA(response.message, response.errorCode, response.data)),
      };
    }
  });

  return applyDecorators(
    ...Object.values(apiResponses).map((value: ApiResponseOptions) => {
      return ApiResponse({ ...value });
    }),
  );
}
