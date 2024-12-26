import { PlanEntity } from "../entities/planEntity";

export interface PlanRepository {
  createPlan(plan: PlanEntity): Promise<PlanEntity>;
  update(id: string, updatedPlan: Partial<PlanEntity>): Promise<PlanEntity | null>;
  getAllPlans(): Promise<PlanEntity[]>;
  getOnePlan(id: string): Promise<PlanEntity | null>;
  deletePlan(id: string): Promise<boolean>;
}
