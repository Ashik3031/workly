import { membersentity } from "../entities/membersentity";

export interface memberRepository {
  save(org: membersentity): Promise<void>;
  findByEmail(email: string): Promise<membersentity | null>;
  update(org: membersentity): Promise<void>;
  save(org: membersentity): Promise<void>;
  findByKey(orgKey: string): Promise<{ exists: boolean, orgDetails?: any }> ; 
}
