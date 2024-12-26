import { memberRepository } from "../../../domain/repositories/memberRepository";
import { JwtService } from "../../../utils/jwtservice"; // Utility to generate JWT

export class VerifyOtp {
  private memberRepository: memberRepository;
  private jwtService: JwtService;

  constructor(memberRepository: memberRepository, jwtService: JwtService) {
    this.memberRepository = memberRepository;
    this.jwtService = jwtService;
  }

  async execute(email: string, otp: string): Promise<string> {
    // Fetch the organization by email
    const org = await this.memberRepository.findByEmail(email);
    if (!org) throw new Error("Organization not found.");
    
    // Check if OTP matches and is not expired
    if (org.otp !== otp) throw new Error("Invalid OTP.");
    if (!org.otpExpiry || new Date() > org.otpExpiry) {
      throw new Error("OTP has expired.");
    }

    // Mark as verified and clean up OTP from the database
    org.verifyOtp();
    await this.memberRepository.update(org);

    // Generate JWT token
    const token = this.jwtService.generate({ id: org.id, email: org.email });

    return token;
  }
}
