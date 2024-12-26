import express,{ Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';


dotenv.config(); 


import cors from 'cors';
import mongoose from "mongoose";
import authRoute from '../interfaces/http/routes/Authroutes'
import PlanRouters from '../interfaces/http/routes/planRouter'
import OrganisationRouters from '../interfaces/http/routes/OrganisationRouter'
import planRouter from "../interfaces/http/routes/PlansRouter";
import paymentRouter from "../interfaces/http/routes/paymentrouter"
import MemberController  from "../interfaces/http/routes/membersRouter";
import '../infrastructure/corn/cleanup'






const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend's URL if different
    methods: 'GET,POST',
    credentials: true, // Allow credentials if needed (e.g., cookies, session)
  }));

 

app.use(express.json());

app.use("/auth", authRoute);
app.use("/plan",PlanRouters);
app.use('/org', OrganisationRouters);
app.use('/payment',paymentRouter)
app.use('/all',planRouter)
app.use('/member', MemberController)
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Backend is running!" });
  });
  
  
  
mongoose.connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
