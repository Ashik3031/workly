import mongoose from 'mongoose';

export class membersentity {
  public _id?: mongoose.Types.ObjectId;
  public name: string;
  public email: string;
  public password: string;
  public otp: string | null;
  public otpExpiry: Date | null;
  public verified: boolean;
  public empid: string;
  public orgKey: string;
  public role: string;
  
  

  constructor(options:{_id?: mongoose.Types.ObjectId;}, name: string, email: string, password: string, empid: string, orgKey: string, role: string ) {
    this._id = options._id || new mongoose.Types.ObjectId();
    this.name = name;
    this.email = email;
    this.password = password;
    this.otp = null;
    this.otpExpiry = null;
    this.verified = false;
    this.empid = empid;
    this.orgKey = orgKey;
    this.role = role;
    
  }

  get id(): string {
    return this._id?.toHexString() || '';
  }


  
  
  setOtp(otp: string, expiry: Date) {
    this.otp = otp;
    this.otpExpiry = expiry;
  }

  isOtpExpired(): boolean {
    return !this.otpExpiry || new Date() > this.otpExpiry;
  }

  setOrgKey(orgKey: string) {
    this.orgKey = orgKey;
  }

  verifyOtp() {
    this.otp = null;
    this.otpExpiry = null;
    this.verified = true;
  }
}
