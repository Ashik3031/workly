import mongoose, { Schema, Document } from "mongoose";

// Define PlanEntity without conflicting `id`
export type PlanEntity = {
  name: string;
  price: number;
  duration: number; // Duration in days\
  members: number;
  features: string;
  type: string;
};

// Extend Mongoose Document without `id` conflict
interface PlanDocument extends Document {
  name: string;
  price: number;
  duration: number;
  members: number;
  features: string;  
  type: string;
}

// Define Mongoose Schema
const PlanSchema: Schema = new Schema<PlanDocument>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  members: {type: Number, required: true},
  features: {type: String, required:true},
  type: {type: String, required:true}
});

// Create and export Mongoose Model
export default mongoose.model<PlanDocument>("Plans", PlanSchema);
