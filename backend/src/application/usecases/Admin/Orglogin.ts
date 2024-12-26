// application/usecases/loginOrg.ts

import { OrgRepository } from "../../../domain/repositories/OrganisationRepositories";
import { JwtService } from "../../../utils/jwtservice"; // Assuming you have a JwtService for generating tokens

export class LoginOrg {
  private orgRepository: OrgRepository;
  private jwtService: JwtService;

  constructor(orgRepository: OrgRepository, jwtService: JwtService) {
    this.orgRepository = orgRepository;
    this.jwtService = jwtService;
  }

  async execute(email: string, password: string): Promise<{ token: string; orgKey: string }> {
    
    const org = await this.orgRepository.findByEmail(email);
    if (!org) throw new Error("Organization not found.");

    if (org.password !== password) {
      throw new Error("Invalid password.");
    }

    if (!org.verified) {
      throw new Error("Organization not verified.");
    }

    
    const token = this.jwtService.generate({ orgKey: 'uniqueOrgKey123' }, '1d');
    return { token, orgKey: org.orgKey };
  }
 }
