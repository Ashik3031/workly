import { OrgEntity } from "../entities/OrgEntity";

export interface OrgRepository {
  save(org: OrgEntity): Promise<void>;
  findByEmail(email: string): Promise<OrgEntity | null>;
  update(org: OrgEntity): Promise<void>;
  save(org: OrgEntity): Promise<void>;
  findByKey(orgKey: string): Promise<OrgEntity | null>; 
}
