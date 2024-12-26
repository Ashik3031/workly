import { Request, Response } from "express";
import { updatePlanUseCase } from "../../../application/usecases/superAdmin/updateplanUsecase";
import { createPlanUseCase } from "../../../application/usecases/superAdmin/createPlanUseCase";
import { PlanRepositoryImpl } from "../../../infrastructure/repositories/planrepositoriesImpl";
import { getAllPlansUseCase } from "../../../application/usecases/superAdmin/getallPlanUseCase";
import { getOnePlanUseCase } from "../../../application/usecases/superAdmin/getonePlanUseCase";
import { deletePlanUseCase } from "../../../application/usecases/superAdmin/deletePlanUseCase"


// Correct: Use an instance of the repository
const repository = new PlanRepositoryImpl();

export const createPlanController = async (req: Request, res: Response): Promise<void> => {
  try {
    const plan = await createPlanUseCase(req.body, repository);
    res.status(201).json(plan);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unexpected error occurred." });
    }
  } // Correct: Added the missing closing brace
};

export const updatePlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Extract plan ID
    const updatedPlan = req.body; // Extract updated plan details

    // Correct: Use the `repository` instance instead of the class
    const updated = await updatePlanUseCase(id, updatedPlan, repository);

    res.status(200).json({ message: "Plan updated successfully", updated });
  } catch (error: unknown) {
    res.status(400).json({ message: (error as Error).message });
  }
}

  export const getAllPlansController = async (req: Request, res: Response): Promise<void> => {
    try {
      const plans = await getAllPlansUseCase(repository);
      res.status(200).json(plans);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unexpected error occurred." });
      }
    }
  };

  export const getOnePlanController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params; // Extract the ID from request parameters
      const plan = await getOnePlanUseCase(id, repository);
      res.status(200).json(plan);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unexpected error occurred." });
      }
    }
  };

  export const deletePlanController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params; // Extract the ID from request parameters
      const success = await deletePlanUseCase(id, repository);
      res.status(200).json({ message: "Plan deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: "An unexpected error occurred." });
      }
    }
  };

