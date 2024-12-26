import { Router } from "express";
import { memberRepositoryImpl } from "../../../infrastructure/repositories/membersRepositoryImpl";
import { JwtService } from "../../../utils/jwtservice";

// Use Cases
import { Createuser } from "../../../application/usecases/members/createmembers";
import { VerifyOtp } from "../../../application/usecases/members/otpverfication";
import { LoginOrg } from "../../../application/usecases/members/loginuser"

// Controllers
import { UserController } from "../controllers/memberscontroller";

// Router
const userRouter = Router();

// Dependencies
const userRepository = new memberRepositoryImpl();
const jwtService = new JwtService();

// Use Case Instances
const createUserUseCase = new Createuser(userRepository);
const verifyOtpUseCase = new VerifyOtp(userRepository, jwtService);
const loginOrgUseCase = new LoginOrg(userRepository, jwtService);

// Controller Instance
const usercontroller = new UserController(
  createUserUseCase,
  verifyOtpUseCase,
  loginOrgUseCase
);

// Routes
userRouter.post("/register", usercontroller.register.bind(usercontroller)); // Registration
userRouter.post("/verify-otp", usercontroller.verify.bind(usercontroller)); // OTP Verification
userRouter.post("/login", usercontroller.login.bind(usercontroller)); //login

export default userRouter;
