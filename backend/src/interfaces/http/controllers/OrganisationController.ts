import { Request, Response } from "express";
import { CreateOrg } from "../../../application/usecases/Admin/CreateOrganisationusecase";
import { VerifyOtp } from "../../../application/usecases/Admin/verfiyOtp";
import { LoginOrg } from "../../../application/usecases/Admin/Orglogin";
import { OrgRepository } from "../../../domain/repositories/OrganisationRepositories";
import { JwtService } from "../../../utils/jwtservice";
import { OrgRepositoryImpl } from "../../../infrastructure/repositories/organizationRepositoryImpl";
import { GetOrg } from "../../../application/usecases/Admin/Getorg"


export class OrgController {
  private createOrg: CreateOrg;
  private verifyOtp: VerifyOtp;
  private loginOrg: LoginOrg;
  private orgRepository: OrgRepository; 
  private jwtService: JwtService; 
  private getOrgUseCase: GetOrg;



  constructor(createOrg: CreateOrg, verifyOtp: VerifyOtp, loginOrg: LoginOrg, getOrgUseCase: GetOrg) {
    this.createOrg = createOrg;
    this.verifyOtp = verifyOtp;
    this.loginOrg = loginOrg; 
    this.orgRepository = new OrgRepositoryImpl();
    this.jwtService = new JwtService();
   this.getOrgUseCase = getOrgUseCase;
  }

     

  // Public methods for routing
  public async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      await this.createOrg.execute(name, email, password);
      res.status(200).send("OTP sent to email");
    } catch (error) {
      console.error("Error during registration:", error);
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred." });
      }
    }
  }

  public async verify(req: Request, res: Response): Promise<void> {
    const { email, otp } = req.body;

    try {
      const token = await this.verifyOtp.execute(email, otp);
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error during OTP verification:", error);
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred." });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const loginOrg = new LoginOrg(this.orgRepository, this.jwtService);
  
    try {
      const { token, orgKey }: { token: string; orgKey: string } = await loginOrg.execute(email, password);
      console.log("hwloo", token, orgKey)
      res.status(200).json({ token, orgKey });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
  


  public async getOrg(req: Request, res: Response): Promise<void> {
    const orgKey = req.params.key; // Change from orgId to orgKey
  
    try {
      // Call the updated use case method with orgKey
      const org = await this.getOrgUseCase.execute(orgKey); // Pass orgKey here
      res.status(200).json(org);
    } catch (error) {
      console.error("Error fetching organization details:", error);
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred." });
      }
    }
  }

}
