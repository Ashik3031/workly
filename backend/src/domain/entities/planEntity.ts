export interface PlanEntity {
    id?: string; // Ensure this matches the type of Mongoose's id
    name: string;
    price: number;
    duration: number;
    members: number;
    features: string;
    type: string;
  }
   