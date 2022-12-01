import { HttpStatusCode } from "../enums/http-code";
import { HttpResponse } from "../http-response";

export class HttpResponseView {
  public static render<T>(statusCode: number, data: T): HttpResponse {
    return {
      statusCode,
      body: data,
    };
  }

  static ok<Type>(data: Type): HttpResponse {
    return {
      statusCode: HttpStatusCode.Ok,
      body: data,
    };
  }

  static created<Type>(data: Type): HttpResponse {
    return {
      statusCode: HttpStatusCode.Created,
      body: data,
    };
  }

  static badRequest<Type>(error: Type): HttpResponse {
    return {
      statusCode: HttpStatusCode.BadRequest,
      body: { message: error },
    };
  }

  static internalError(): HttpResponse {
    return {
      statusCode: HttpStatusCode.InternalServerError,
    };
  }
}
