import { OrgRepository } from "../../domain/repositories/OrganisationRepositories";
import { OrgEntity } from "../../domain/entities/OrgEntity";
import { OrgModel } from "../../domain/models/OrganisationModel"; // Mongoose Model

export class OrgRepositoryImpl implements OrgRepository {
  async save(org: OrgEntity): Promise<void> {
    const orgDocument = new OrgModel(org);
    await orgDocument.save();
  }

  async findByEmail(email: string): Promise<OrgEntity | null> {
    const orgDocument = await OrgModel.findOne({ email });
    if (!orgDocument) return null;

    const org = new OrgEntity(orgDocument.name, orgDocument.email, orgDocument.password);
    org.id = orgDocument.id;
    org.otp = orgDocument.otp;
    org.otpExpiry = orgDocument.otpExpiry;
    org.verified = orgDocument.verified;
    org.orgKey = orgDocument.orgKey;

    return org;
  }

  async findByKey(orgKey: string): Promise<OrgEntity | null> {
    // Assuming that you are now searching by `orgKey` instead of `orgId`
    const orgDocument = await OrgModel.findOne({ orgKey }); // Change `findById` to `findOne` and use `orgKey`
    if (!orgDocument) return null;
  
    // Create and populate the OrgEntity with the relevant fields from the database
    const org = new OrgEntity(orgDocument.name, orgDocument.email, orgDocument.password);
    org.id = orgDocument.id; // Assuming the MongoDB `_id` is being stored in `orgDocument.id`
    org.otp = orgDocument.otp;
    org.otpExpiry = orgDocument.otpExpiry;
    org.verified = orgDocument.verified;
    org.plan = orgDocument.plan;
  
    return org;
  }
  

  async update(org: OrgEntity): Promise<void> {
    await OrgModel.findByIdAndUpdate(org.id, {
      verified: org.verified,
      otp: org.otp,
      otpExpiry: org.otpExpiry,
    });
  }

  
}
