import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/url.js";
import { connectToMongoDB } from "./connect.js";

dotenv.config();

connectToMongoDB().then(() => {
  console.log("Connected to MongoDB");
});

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
