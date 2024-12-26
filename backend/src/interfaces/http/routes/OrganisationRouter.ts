import { Router } from "express";
import { OrgRepositoryImpl } from "../../../infrastructure/repositories/organizationRepositoryImpl";
import { PlanRepositoryImpl } from "../../../infrastructure/repositories/plansRepositoryImpl";
import { JwtService } from "../../../utils/jwtservice";

// Use Cases
import { CreateOrg } from "../../../application/usecases/Admin/CreateOrganisationusecase";
import { VerifyOtp } from "../../../application/usecases/Admin/verfiyOtp";
import { LoginOrg } from "../../../application/usecases/Admin/Orglogin";
import { GetOrg } from "../../../application/usecases/Admin/Getorg";


// Controllers
import { OrgController } from "../controllers/OrganisationController";

// Router
const orgRouter = Router();

// Dependencies
const orgRepository = new OrgRepositoryImpl();
const plansRepository = new PlanRepositoryImpl();
const jwtService = new JwtService();

// Use Case Instances
const createOrgUseCase = new CreateOrg(orgRepository);
const verifyOtpUseCase = new VerifyOtp(orgRepository, jwtService);
const loginOrgUseCase = new LoginOrg(orgRepository, jwtService);
const getOrgUseCase = new GetOrg(orgRepository);


// Controller Instance
const orgController = new OrgController(
  createOrgUseCase,
  verifyOtpUseCase,
  loginOrgUseCase,
  getOrgUseCase
);

// Routes
orgRouter.post("/register", orgController.register.bind(orgController)); // Registration
orgRouter.post("/verify-otp", orgController.verify.bind(orgController)); // OTP Verification
orgRouter.post("/login", orgController.login.bind(orgController)); // Login
orgRouter.get("/:key", orgController.getOrg.bind(orgController)); // Fetch Organization Details by Key


export default orgRouter;
   