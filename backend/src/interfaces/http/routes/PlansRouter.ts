import { Router } from "express";
import { PlanController } from "../controllers/plansController";
import { PlanRepositoryImpl } from "../../../infrastructure/repositories/plansRepositoryImpl"; // Ensure this points to your correct repository
import { GetAllPlansUseCase } from "../../../application/usecases/Admin/PlansUsecase";

// Create a new instance of PlanRepositoryImpl and GetAllPlans
const planRepository = new PlanRepositoryImpl();
const getAllPlansUseCase = new GetAllPlansUseCase(planRepository);
const planController = new PlanController(getAllPlansUseCase);

const planRouter = Router();

// Define the route for getting all plans
planRouter.get("/plans", (req, res) => planController.getAllPlans(req, res));

export default planRouter;
