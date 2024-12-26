// domain/models/paymentModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import { PaymentEntity } from '../entities/payment';

export interface PaymentDocument extends Document {
  _id: string;
  userId: string;
  planId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  stripePaymentIntentId?: string;
  createdAt: Date;
  toObject(): PaymentEntity;
}

const PaymentSchema: Schema = new Schema({
  userId: { type: String, required: true },
  planId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  status: { 
    type: String, 
    enum: ['pending', 'success', 'failed'], 
    default: 'pending' 
  },
  stripePaymentIntentId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Add a method to convert to plain object
PaymentSchema.methods.toObject = function() {
  const obj = mongoose.Model.prototype.toObject.call(this);
  return {
    id: obj._id,
    userId: obj.userId,
    planId: obj.planId,
    amount: obj.amount,
    currency: obj.currency,
    status: obj.status,
    stripePaymentIntentId: obj.stripePaymentIntentId,
    createdAt: obj.createdAt
  };
};

export const PaymentModel = mongoose.model<PaymentDocument>('Payment', PaymentSchema);