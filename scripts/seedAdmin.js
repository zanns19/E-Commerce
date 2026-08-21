/**
 * Creates (or updates) the single admin account.
 *
 * Usage:
 *   node scripts/seedAdmin.js
 *
 * Reads from .env.local (or process.env):
 *   MONGODB_URI
 *   ADMIN_NAME
 *   ADMIN_EMAIL
 *   ADMIN_PASSWORD
 */
const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function main() {
  const { MONGODB_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!MONGODB_URI) {
    console.error("Missing MONGODB_URI in .env.local");
    process.exit(1);
  }
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env.local");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);

  const AdminSchema = new mongoose.Schema(
    {
      name: String,
      email: { type: String, unique: true, lowercase: true, trim: true },
      passwordHash: String,
    },
    { timestamps: true }
  );

  const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });

  if (existing) {
    existing.name = ADMIN_NAME || existing.name;
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log(`✅ Admin updated: ${existing.email}`);
  } else {
    const admin = await Admin.create({
      name: ADMIN_NAME || "Admin",
      email: ADMIN_EMAIL.toLowerCase(),
      passwordHash,
    });
    console.log(`✅ Admin created: ${admin.email}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
