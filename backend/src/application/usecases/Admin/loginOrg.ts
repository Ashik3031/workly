import { OrgRepository } from "../../../domain/repositories/OrganisationRepositories";
import { JwtService } from "../../../utils/jwtservice";
import bcrypt from "bcrypt";

export class LoginOrg {
  private orgRepository: OrgRepository;
  private jwtService: JwtService;

  constructor(orgRepository: OrgRepository, jwtService: JwtService) {
    this.orgRepository = orgRepository;
    this.jwtService = jwtService;
  } 

  async execute(email: string, password: string): Promise<{ token: string; orgKey: string  }> {
    // Find organization by email
    const org = await this.orgRepository.findByEmail(email);
    console.log("helloo")
    if (!org) throw new Error("Invalid credentials.");

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, org.password);
    if (!isPasswordValid) throw new Error("Invalid credentials.");

    // Generate token with orgKey
    const token = this.jwtService.generate({ orgKey: org.orgKey });
    console.log({"keyyyy": token, orgKey: org.orgKey });
    return { token, orgKey: org.orgKey};
  }
}
