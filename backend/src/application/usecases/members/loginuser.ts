import { memberRepository } from "../../../domain/repositories/memberRepository";
import { JwtService } from "../../../utils/jwtservice";
import bcrypt from "bcrypt";

export class LoginOrg {
  private memberRepository: memberRepository;
  private jwtService: JwtService;

  constructor(memberRepository: memberRepository, jwtService: JwtService) {
    this.memberRepository = memberRepository;
    this.jwtService = jwtService;
  } 

  async execute(email: string, password: string): Promise<{ token: string; orgKey: string  }> {
    // Find organization by email
    const org = await this.memberRepository.findByEmail(email);
    console.log("helloo",email,password)
    if (!org) throw new Error("Invalid credentials.");

    // Validate password
    //const isPasswordValid = await bcrypt.compare(password, org.password);
    let isPasswordValid = false
    if(password == org.password){
         isPasswordValid = true
    }
    if (!isPasswordValid) throw new Error("Invalid credentialss.");

    // Generate token with orgKey
    const token = this.jwtService.generate({ orgKey: org.orgKey });
    console.log({"keyyyy": token, orgKey: org.orgKey });
    return { token, orgKey: org.orgKey};
  }
}
