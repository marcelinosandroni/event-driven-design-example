import { CreateUserCommand } from "../application/commands/create-user-command";
import { CreateUserCommandHandler } from "../application/commands/create-user-command-handler";
import { Controller } from "./contracts/controller";
import { Validation } from "./contracts/validation";
import { HttpRequest } from "./http-request";
import { HttpResponse } from "./http-response";

export class SignupController implements Controller {
  constructor(
    private readonly useCase: CreateUserCommandHandler,
    private readonly validator: Validation
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(request.body);
    if (error) {
      console.error({ error });
      return { statusCode: 400, body: { message: error.message } };
    }
    const user = await this.useCase.handle(request.body as CreateUserCommand);
    if (!user) {
      console.error({ error });
      return { statusCode: 500 };
    }
    return { statusCode: 201, body: user };
  }
}
