import { PlanRepository } from "../../../domain/repositories/planRepository";
import { PlanEntity } from "../../../domain/entities/planEntity";

export const updatePlanUseCase = async (
  id: string,
  updatedPlan: Partial<PlanEntity>,
  planRepository: PlanRepository
): Promise<PlanEntity | null> => {
  // Validate input
  if (!id) throw new Error("Plan ID is required");
  if (!updatedPlan) throw new Error("Updated data is required");

  // Call repository to update the plan
  const updated = await planRepository.update(id, updatedPlan);
  if (!updated) throw new Error("Plan not found or update failed");

  return updated;
};
 