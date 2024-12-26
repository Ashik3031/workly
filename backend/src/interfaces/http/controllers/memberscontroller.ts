import { Request, Response } from "express";
import { Createuser } from "../../../application/usecases/members/createmembers";
import { VerifyOtp } from "../../../application/usecases/members/otpverfication";
import { memberRepository } from "../../../domain/repositories/memberRepository";
import { JwtService } from "../../../utils/jwtservice";
import { memberRepositoryImpl } from "../../../infrastructure/repositories/membersRepositoryImpl";
import { LoginOrg } from "../../../application/usecases/members/loginuser";

export class UserController {
  private createUser: Createuser;
  private verifyOtp: VerifyOtp;
  private loginOrg: LoginOrg;
  private memberRepository: memberRepository; 
  private jwtService: JwtService;

  constructor(createUser: Createuser, verifyOtp: VerifyOtp, loginOrg: LoginOrg) {
    this.createUser = createUser;
    this.verifyOtp = verifyOtp;
    this.loginOrg = loginOrg;
    this.memberRepository = new memberRepositoryImpl();
    this.jwtService = new JwtService();
  }

  // Public methods for routing
  public async register(req: Request, res: Response): Promise<void> {
    const { name, email, password, empid, orgKey, role} = req.body;
    console.log("body",req.body)

    try {
      await this.createUser.execute(name, email, password, empid, orgKey, role);
      res.status(200).send("OTP sent to email");
    } catch (error) {
      console.error("Error during registration:", error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
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
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred." });
      }
    }
  }


  async login(req: Request, res: Response): Promise<void> {
    console.log("welocme")
    const { email, password } = req.body;
    const loginOrg = new LoginOrg(this.memberRepository, this.jwtService);
  
    try {
      const { token, orgKey }: { token: string; orgKey: string } = await loginOrg.execute(email, password);
      console.log("hwloo", token, orgKey)
      res.status(200).json({ token, orgKey });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}
