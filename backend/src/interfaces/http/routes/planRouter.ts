import express from "express";
import { createPlanController , updatePlan , getAllPlansController , getOnePlanController, deletePlanController } from "../../http/controllers/plancontroller";


const router = express.Router();

router.post("/create", createPlanController);
router.put("/update/:id", updatePlan);
router.get('/showall', getAllPlansController)
router.get('/show/:id', getOnePlanController)
router.delete('/remove/:id', deletePlanController)

export default router;
 