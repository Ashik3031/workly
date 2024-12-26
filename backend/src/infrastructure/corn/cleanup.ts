import cron from "node-cron";
import { OrgModel } from "../../domain/models/OrganisationModel"; // Adjust path as necessary

// Schedule the cleanup job
cron.schedule("*/5 * * * *", async () => {
  const tenMinutesAgo = new Date(new Date().getTime() - 60 * 60 * 1000);
  try {
    // Delete unverified records created over 10 minutes ago
    const result = await OrgModel.deleteMany({
      createdAt: { $lte: tenMinutesAgo },
      verified: false,
    });

    console.log(`${result.deletedCount} stale organization records deleted.`);
  } catch (error) {
    console.error("Error cleaning up stale organization records:", error);
  }
});
  