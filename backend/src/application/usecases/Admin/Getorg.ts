import { OrgRepository } from "../../../domain/repositories/OrganisationRepositories";
import { OrgEntity } from "../../../domain/entities/OrgEntity";

export class GetOrg {
  private orgRepository: OrgRepository;

  constructor(orgRepository: OrgRepository) {
    this.orgRepository = orgRepository;
  }

  // Modify to accept orgKey instead of orgId
  async execute(orgKey: string): Promise<OrgEntity | null> {
    const org = await this.orgRepository.findByKey(orgKey); // Change repository call
    if (!org) throw new Error("Organization not found.");
    return org;
  }
}
