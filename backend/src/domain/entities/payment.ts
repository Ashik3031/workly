export interface PaymentEntity {
  id?: string;
  userId: string;
  planId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  stripePaymentIntentId?: string;
  createdAt: Date;
}