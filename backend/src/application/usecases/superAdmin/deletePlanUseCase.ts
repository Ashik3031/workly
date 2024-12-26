import { PlanRepository } from "../../../domain/repositories/planRepository";

export const deletePlanUseCase = async (id: string, repository: PlanRepository): Promise<boolean> => {
  const success = await repository.deletePlan(id);
  if (!success) throw new Error(`Plan with ID ${id} not found.`);
  return success;
};
