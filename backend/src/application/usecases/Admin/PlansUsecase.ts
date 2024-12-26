import { PlanRepository } from "../../../domain/repositories/plansRepository";
import { PlanEntity } from "../../../domain/entities/planEntity";

export class GetAllPlansUseCase {
  private planRepository: PlanRepository;

  // Constructor to inject the PlanRepository dependency
  constructor(planRepository: PlanRepository) {
    this.planRepository = planRepository;
  }

  // Return plans when executed, with better error handling
  async execute(): Promise<PlanEntity[]> {
    try {
      const plans = await this.planRepository.getAllPlans();
      if (plans.length === 0) {
        throw new Error("No plans available.");
      }
      return plans;
    } catch (error) {
      throw new Error("Failed to fetch plans. Please try again later.");
    }
  }
}
  