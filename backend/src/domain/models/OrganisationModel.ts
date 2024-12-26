import mongoose, { Schema, Document } from "mongoose";
import { OrgEntity } from "../entities/OrgEntity";

export interface OrgDocument extends Omit<OrgEntity, "id">, Document {
  _id: mongoose.Types.ObjectId; // Explicitly type _id
  id: string; // Override the id to map _id
}

const OrgSchema = new Schema<OrgDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  otp: { type: String, required: false },
  otpExpiry: { type: Date, required: false },
  orgKey: { type: String, required: true, unique: true },
  plan: {type: String, required: false, default: "basic" }
});

// Virtual field to map _id to id
OrgSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtuals are included in JSON responses
OrgSchema.set("toJSON", {
  virtuals: true,
});

export const OrgModel = mongoose.model<OrgDocument>("Organization", OrgSchema);
