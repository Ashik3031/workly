import { Request, Response } from 'express';
import { CreatePaymentUseCase } from '../../../application/usecases/Admin/paymentUsecae';
import { PaymentRepositoryImpl } from '../../../infrastructure/repositories/paymentRepositoryImpl';
import { PlanRepositoryImpl } from '../../../infrastructure/repositories/plansRepositoryImpl';
import Stripe from 'stripe';


console.log('Stripe Secret Keyy:', process.env.STRIPE_SECRET_KEY);

const paymentRepository = new PaymentRepositoryImpl();
const planRepository = new PlanRepositoryImpl();
const createPaymentUseCase = new CreatePaymentUseCase(
  paymentRepository, 
  planRepository
);

export class PaymentController {
  static async createPaymentIntent(req: Request, res: Response) {
    try {
      const { planId, userId } = req.body;

      if (!planId || !userId) {
        return res.status(400).json({ error: 'Missing planId or userId' });
      }

      const result = await createPaymentUseCase.execute(planId, userId);
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Payment Intent Error:', error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Unexpected error' 
      });
    }
  }

  static async handleWebhook(req: Request, res: Response) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-11-20.acacia"
    });
    const sig = req.headers['stripe-signature'];

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig as string,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      const paymentRepository = new PaymentRepositoryImpl();

      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          await paymentRepository.updatePaymentStatus(
            paymentIntent.id, 
            'success'
          );
          break;
        case 'payment_intent.payment_failed':
          const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
          await paymentRepository.updatePaymentStatus(
            failedPaymentIntent.id, 
            'failed'
          );
          break;
      }

      res.status(200).send();
    } catch (err) {
      console.error(err);
      res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : ''}`);
    }
  }
}