import { Request, Response } from "express";
import { GetAllPlansUseCase } from "../../../application/usecases/Admin/PlansUsecase";  // Import the use case

export class PlanController {
  private getAllPlansUseCase: GetAllPlansUseCase;

  constructor(getAllPlansUseCase: GetAllPlansUseCase) {
    this.getAllPlansUseCase = getAllPlansUseCase;
  }

  // Handle the API endpoint for getting all plans
  public async getAllPlans(req: Request, res: Response): Promise<void> {
    try {
      const plans = await this.getAllPlansUseCase.execute();  // Execute the GetAllPlans use case
      res.status(200).json(plans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      res.status(500).json({
        error: error instanceof Error ? error.message : "Failed to fetch plans.",
      });
    }
  }
}
