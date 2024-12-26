export class OrgEntity {
  id(id: any, arg1: { verified: boolean; otp: string | null; otpExpiry: Date | null; }) {
    throw new Error("Method not implemented.");
  }
  public name: string;
  public email: string;
  public password: string;
  public otp: string | null;
  public otpExpiry: Date | null;
  public verified: boolean;
  public orgKey: string;
  public plan: string;

  constructor(name: string, email: string, password: string, plan: string = "basic") {
  
    this.name = name;
    this.email = email;
    this.password = password;
    this.otp = null;
    this.otpExpiry = null;
    this.verified = false;
    this.orgKey = "";
    this.plan = plan
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
