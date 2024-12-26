import { PlanRepository } from "../../../domain/repositories/planRepository";
import { PlanEntity } from "../../../domain/entities/planEntity";

export const getAllPlansUseCase = async (repository: PlanRepository): Promise<PlanEntity[]> => {
  const plans = await repository.getAllPlans();
  if (!plans.length) throw new Error("No plans available.");
  return plans;
};
