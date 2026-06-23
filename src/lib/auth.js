import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

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
  // user মডেল আপডেট করুন
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false, // 'true' থাকলে অনেক সময় ডিফল্ট ভ্যালু ছাড়া এরর দেয়
      },
      isBlocked: {
        type: "boolean",
        required: false,
      },
    },
  },
});