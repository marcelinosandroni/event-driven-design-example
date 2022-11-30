import { Controller } from "../presentation/contracts/controller";

export const expressRouterAdapter = (controller: Controller) => {
  return async (request: any, response: any) => {
    const httpResponse = await controller.handle(request);
    return response.status(httpResponse.statusCode).send(httpResponse.body);
  };
};
