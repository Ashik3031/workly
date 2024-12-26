import { PlanEntity } from "../../domain/entities/planEntity";
import { PlanRepository } from "../../domain/repositories/planRepository";
import PlanModel from "../../domain/models/planModels";

export class PlanRepositoryImpl implements PlanRepository {
  async createPlan(plan: PlanEntity): Promise<PlanEntity> {
    const newPlan = await PlanModel.create(plan);
    return {
      id: newPlan.id,
      name: newPlan.name,
      price: newPlan.price,
      duration: newPlan.duration,
      members: newPlan.members,
      features: newPlan.features,
      type: newPlan.type,
    };
  }

  async update(id: string, updatedPlan: Partial<PlanEntity>): Promise<PlanEntity | null> {
    const plan = await PlanModel.findByIdAndUpdate(id, updatedPlan, { new: true });
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

  async getAllPlans(): Promise<PlanEntity[]> {
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
  }

  async getOnePlan(id: string): Promise<PlanEntity | null> {
    const plan = await PlanModel.findById(id);
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


async deletePlan(id: string): Promise<boolean> {
    const result = await PlanModel.findByIdAndDelete(id);
    return result !== null;
  }

}