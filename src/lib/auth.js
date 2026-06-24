import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.DB_URL);
const db = client.db("startupforge");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
      },
      isBlocked: {
        type: "boolean",
        required: false,
      },
    },
  },

  // 🔥 MAIN LOGIC (VERY IMPORTANT)
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const adminEmails = ["mdantormia1779@gmail.com"];

          return {
            data: {
              ...user,
              role: adminEmails.includes(user.email)
                ? "Admin"
                : "Founder", // ✅ Default role founder
              isBlocked: false,
            },
          };
        },
      },
    },
  },
});