import mongoose, { Schema, Document } from "mongoose";
import { membersentity } from "../entities/membersentity";

// Omit 'id' from the entity because it's not directly present in the class
export interface userDoc extends Omit<membersentity, "id">, Document {
  _id: mongoose.Types.ObjectId; // Explicitly type _id
  id: string; // Override the id to map _id
}

const userschema = new Schema<userDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  otp: { type: String, required: false },
  otpExpiry: { type: Date, required: false },
  orgKey: { type: String, required: true },
  empid: { type: String, required: false },
  role: { type: String, required: true },
});

// Virtual field to map _id to id
userschema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtuals are included in JSON responses
userschema.set("toJSON", {
  virtuals: true,
});

export const usermodel = mongoose.model<userDoc>("users", userschema);
