import { PlanRepository } from "../../../domain/repositories/planRepository";
import { PlanEntity } from "../../../domain/entities/planEntity";

export const getOnePlanUseCase = async (id: string, repository: PlanRepository): Promise<PlanEntity> => {
  const plan = await repository.getOnePlan(id);
  if (!plan) throw new Error(`Plan with ID ${id} not found.`);
  return plan;
};
