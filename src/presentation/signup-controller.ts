import { CreateUserCommand } from "../application/commands/create-user-command";
import { CreateUserCommandHandler } from "../application/commands/create-user-command-handler";
import { Controller } from "./contracts/controller";
import { Validation } from "./contracts/validation";
import { HttpRequest } from "./http-request";
import { HttpResponse } from "./http-response";
import { HttpResponseView } from "./views/http-response-view";

export class SignupController implements Controller {
  constructor(
    private readonly useCase: CreateUserCommandHandler,
    private readonly validator: Validation
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(request.body);
    if (error) {
      console.error({ error });
      return HttpResponseView.badRequest(error.message);
    }
    const user = await this.useCase.handle(request.body as CreateUserCommand);
    if (!user) {
      console.error({ error });
      return HttpResponseView.internalError();
    }
    return HttpResponseView.created(user);
  }
}
