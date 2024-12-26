// infrastructure/repositoryImpl/paymentRepositoryImpl.ts
import { PaymentRepository } from '../../domain/repositories/paymentRepository';
import { PaymentEntity } from '../../domain/entities/payment';
import { PaymentModel } from '../../domain/models/paymentModel';

export class PaymentRepositoryImpl implements PaymentRepository {
  async createPayment(payment: PaymentEntity): Promise<PaymentEntity> {
    const newPayment = new PaymentModel({
      userId: payment.userId,
      planId: payment.planId,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      stripePaymentIntentId: payment.stripePaymentIntentId,
      createdAt: payment.createdAt
    });
    
    const savedPayment = await newPayment.save();
    return savedPayment.toObject();
  }

  async updatePaymentStatus(
    stripePaymentIntentId: string, 
    status: 'pending' | 'success' | 'failed'
  ): Promise<PaymentEntity | null> {
    const updatedPayment = await PaymentModel.findOneAndUpdate(
      { stripePaymentIntentId }, 
      { status }, 
      { new: true }
    );
    
    return updatedPayment ? updatedPayment.toObject() : null;
  }

  async getPaymentByStripeId(stripePaymentIntentId: string): Promise<PaymentEntity | null> {
    const payment = await PaymentModel.findOne({ stripePaymentIntentId });
    return payment ? payment.toObject() : null;
  }
}