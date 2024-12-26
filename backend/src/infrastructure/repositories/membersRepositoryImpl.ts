import { memberRepository } from "../../domain/repositories/memberRepository";
import { membersentity } from "../../domain/entities/membersentity";
import { usermodel } from "../../domain/models/membersModel"; // Mongoose Model
import { OrgModel } from "../../domain/models/OrganisationModel"

export class memberRepositoryImpl implements memberRepository {
  
  // Save a new member (organization) document
  async save(org: membersentity): Promise<void> {
    const orgDocument = new usermodel({
      name: org.name,
      email: org.email,
      password: org.password,
      empid: org.empid,
      role: org.role,
      orgKey: org.orgKey, // Make sure orgKey is passed
      otp: org.otp,
      otpExpiry: org.otpExpiry,
      verified: org.verified,
    });
    await orgDocument.save();
  }

  // Find a member by email
  async findByEmail(email: string): Promise<membersentity | null> {
    const orgDocument = await usermodel.findOne({ email });
    if (!orgDocument) return null;
    
    // Construct membersentity from the document data
    const org = new membersentity(
     { _id: orgDocument._id},
      orgDocument.name,
      orgDocument.email,
      orgDocument.password,  
      orgDocument.empid,
      orgDocument.role,
      orgDocument.orgKey // Ensure orgKey is included
    );
    
    org.otp = orgDocument.otp;
    org.otpExpiry = orgDocument.otpExpiry;
    org.verified = orgDocument.verified;

    return org;
  }

  // Find a member by orgKey
  async findByKey(orgKey: string): Promise<{ exists: boolean, orgDetails?: any }> {
    const orgDocument = await OrgModel.findOne({ orgKey });
    return {
      exists: !!orgDocument,
      orgDetails: orgDocument || undefined
    };
  }
  

  // Update a member's information (e.g., after OTP verification)
  async update(org: membersentity): Promise<void> {
    try {
      console.log("orgiddddddd",org.id)
      const result = await usermodel
        .findByIdAndUpdate(
          org.id,
          {
            verified: org.verified,
            otp: org.otp,
            otpExpiry: org.otpExpiry,
          },
          { new: true } // Ensures updated document is returned
        )
        .exec(); // Ensures execution of the query
      console.log('Updated user:', result);
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Error updating user.');
    }
  }
  
  
}
