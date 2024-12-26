import { PaymentEntity } from '../entities/payment';

export interface PaymentRepository {
  createPayment(payment: PaymentEntity): Promise<PaymentEntity>;
  updatePaymentStatus(
    stripePaymentIntentId: string, 
    status: 'pending' | 'success' | 'failed'
  ): Promise<PaymentEntity | null>;
  getPaymentByStripeId(stripePaymentIntentId: string): Promise<PaymentEntity | null>;
}