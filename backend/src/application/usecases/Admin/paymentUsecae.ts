import Stripe from 'stripe';
import { PaymentRepository } from '../../../domain/repositories/paymentRepository';
import { PlanRepository } from '../../../domain/repositories/plansRepository';
import { PaymentEntity } from '../../../domain/entities/payment';


console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);

export class CreatePaymentUseCase {
  private stripe: Stripe;

  constructor(
    private paymentRepository: PaymentRepository,
    private planRepository: PlanRepository
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-11-20.acacia",
    });
  }

  async execute(planId: string, userId: string): Promise<{ clientSecret: string }> {
    // Validate plan
    const plan = await this.planRepository.getPlanById(planId);
    if (!plan) {
      throw new Error('Plan not found');
    }

    // Create Stripe Payment Intent
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(plan.price * 100), // Convert to cents
      currency: 'usd',
      metadata: { planId, userId }
    });

    // Create Payment Record
    const payment: PaymentEntity = {
      userId,
      planId,
      amount: plan.price,
      currency: 'usd',
      status: 'pending',
      stripePaymentIntentId: paymentIntent.id,
      createdAt: new Date()
    };

    // Save Payment
    await this.paymentRepository.createPayment(payment);

    return { 
      clientSecret: paymentIntent.client_secret! 
    };
  }
}