// interface/routes/paymentRoutes.ts
import express, { Request, Response, NextFunction } from 'express';
import { PaymentController } from '../controllers/paymentcontroller';

const router = express.Router();

// Wrap async controller methods to handle errors
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

router.post(
  '/create-payment-intent', 
  asyncHandler(async (req: Request, res: Response) => {
    await PaymentController.createPaymentIntent(req, res);
  })
);

router.post(
  '/webhook', 
  express.raw({ type: 'application/json' }),
  asyncHandler(async (req: Request, res: Response) => {
    await PaymentController.handleWebhook(req, res);
  })
);

export default router;