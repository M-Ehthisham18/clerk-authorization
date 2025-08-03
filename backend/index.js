import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/configs/db.js";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express';
import { clerkClient, requireAuth, getAuth } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./src/inngest/index.inngest.js";


dotenv.config();
await connectDB()
const app = express();
const port = 3000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());


app.get("/", async (req,res) => {
  try {
    res.status(200).send("server is live...")
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/analytics" ,requireAuth(),async (req, res) => {
  try {
    res.status(200).send(
    `analytics page is accessible only to authorized users.`)
  } catch (error) {
    console.log(error.message);
  }
})

// inngest route
app.use("/api/inngest", serve({ client: inngest, functions }));


app.listen(port, () => console.log(`server is running on http://localhost:${port}`))
