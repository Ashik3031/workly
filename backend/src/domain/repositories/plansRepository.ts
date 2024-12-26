import { PlanEntity } from "../../domain/entities/planEntity";

export interface PlanRepository {
  getAllPlans(): Promise<PlanEntity[]>;
  getPlanById(planId: string): Promise<PlanEntity | null>;
}
  