import { OrgRepository } from "../../../domain/repositories/OrganisationRepositories";
import { OrgEntity } from "../../../domain/entities/OrgEntity";
import { sendOtpToEmail } from "../../../utils/emailService"; // Utility to send OTP via email
import { generateUniqueKey } from "../../../utils/uniquekey";


export class CreateOrg {
  private orgRepository: OrgRepository;

  constructor(orgRepository: OrgRepository) {
    this.orgRepository = orgRepository;
  }

  async execute(name: string, email: string, password: string): Promise<void> {
    // Check if email is already registered
    const existingOrg = await this.orgRepository.findByEmail(email);
    if (existingOrg) throw new Error("Email is already registered.");

    // Create organization entity
    const org = new OrgEntity(name, email, password);

    // Generate OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(new Date().getTime() + 1 * 60 * 1000); // OTP expiry 1 min

 

    const orgKey = generateUniqueKey(6); 

    // Set OTP, expiry, and unique key to the organization
    org.setOtp(otp, otpExpiry);
    org.setOrgKey(orgKey);


    // Save organization with OTP
    org.setOtp(otp, otpExpiry);
    await this.orgRepository.save(org);

    // Send OTP to email
    await sendOtpToEmail(email, otp);
  }

  
}
