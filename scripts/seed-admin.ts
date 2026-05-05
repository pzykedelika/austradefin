import { config } from "dotenv";
config({ path: ".env.local" });

import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!CONVEX_URL) {
  console.error("Set NEXT_PUBLIC_CONVEX_URL in .env.local");
  process.exit(1);
}

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4];

if (!email || !password || !name) {
  console.error("Usage: npx tsx scripts/seed-admin.ts <email> <password> <name>");
  process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

async function main() {
  const result = await client.mutation(api.auth.createAdminAccount, {
    email,
    password,
    name,
  });

  if (result.success) {
    console.log(`Admin account created: ${email}`);
  } else {
    console.error(`Failed: ${result.error}`);
  }
}

main().catch(console.error);
