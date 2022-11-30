import { ListUserQueryHandler } from "../application/queries/list-user-handler";
import { Controller } from "./contracts/controller";
import { HttpRequest } from "./http-request";
import { HttpResponse } from "./http-response";

export class ListUserController implements Controller {
  constructor(private readonly useCase: ListUserQueryHandler) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const page = Number(httpRequest.params?.page) || 1;
    const query = { page };
    const users = await this.useCase.handle(query);
    if (!users.length) {
      return { statusCode: 204 };
    }
    return { statusCode: 200, body: users };
  }
}
