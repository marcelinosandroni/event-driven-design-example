import { ListUserQueryHandler } from "../application/queries/list-user-handler";
import { UserMemoryRepository } from "../persistence/user-memory-repository";
import { ListUserController } from "../presentation/list-user-controller";

export const makeListUserController = (): ListUserController => {
  const userRepositoy = new UserMemoryRepository();
  const userQueryHandler = new ListUserQueryHandler(userRepositoy);
  return new ListUserController(userQueryHandler);
};
