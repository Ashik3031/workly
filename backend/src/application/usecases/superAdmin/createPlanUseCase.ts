import { PlanEntity } from "../../../domain/entities/planEntity";
import { PlanRepository } from "../../../domain/repositories/planRepository";



export const createPlanUseCase = async (planData: PlanEntity, repository: PlanRepository): Promise<PlanEntity> => {
  if (!planData.name || planData.price < 0 || planData.duration <= 0) {
    throw new Error("Invalid plan data");
  }
  return await repository.createPlan(planData);
};
