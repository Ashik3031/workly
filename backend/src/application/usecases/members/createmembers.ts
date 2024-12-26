import { memberRepository } from "../../../domain/repositories/memberRepository";
import { membersentity } from "../../../domain/entities/membersentity";
import { sendOtpToEmail } from "../../../utils/emailService"; // Utility to send OTP via email

export class Createuser {
  private memberRepository: memberRepository;

  constructor(memberRepository: memberRepository) {
    this.memberRepository = memberRepository;
  }

  async execute(
    name: string,
    email: string,
    password: string,
    empid: string,  
    orgKey: string,
    role: string,
   
  ): Promise<void> {
    try {
      // Check if the email is already registered
      const existingUser = await this.memberRepository.findByEmail(email);
      if (existingUser) {
        throw new Error("Email is already registered.");
      }

      const { exists, orgDetails } = await this.memberRepository.findByKey(orgKey);
    console.log("Org Details:", orgDetails, "OrgKey:", orgKey);
    
    if (!exists) {
      throw new Error("Org not found. Enter a valid orgKey.");
    }

      // Create a new member entity
      const newMember = new membersentity({},name, email, password, empid, orgKey, role);

      console.log("Role in execute method:", newMember);

      // Generate OTP and set expiry (1-minute expiry)
      const otp = this.generateOtp();
      const otpExpiry = this.generateOtpExpiry();

      // Assign OTP and expiry to the member
      newMember.setOtp(otp, otpExpiry);

      // Save the member with the OTP in the repository
      await this.memberRepository.save(newMember);

      // Send OTP to the user's email
      await sendOtpToEmail(email, otp);
    } catch (error) {
      console.error("Error during user creation:", error);
      throw new Error("Failed to create user. Please try again.");
    }
  }

  // Helper method to generate a random OTP
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Helper method to generate OTP expiry (1 minute from now)
  private generateOtpExpiry(): Date {
    return new Date(Date.now() + 1 * 60 * 1000);
  }
}
