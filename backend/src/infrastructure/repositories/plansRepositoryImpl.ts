import { PlanEntity } from "../../domain/entities/planEntity";
import { PlanRepository } from "../../domain/repositories/plansRepository";
import PlanModel from "../../domain/models/planModels";

export class PlanRepositoryImpl implements PlanRepository {
  async getAllPlans(): Promise<PlanEntity[]> {
    try {
      const plans = await PlanModel.find();
      return plans.map((plan) => ({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        duration: plan.duration,
        members: plan.members,
        features: plan.features,
        type: plan.type,
      }));
    } catch (error) {
      throw new Error("Failed to fetch plans from the database.");
    }
  }

  async getPlanById(planId: string): Promise<PlanEntity | null> {
    const plan = await PlanModel.findById(planId);
    if (!plan) return null;
    return {
      id: plan.id,
      name: plan.name,
      price: plan.price,
      duration: plan.duration,
      members: plan.members,
      features: plan.features,
      type: plan.type,
    };
  }
}
  