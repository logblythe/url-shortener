import express from "express";
import {
  generalShortUrl,
  redirectUrl,
  getAnalytics,
} from "../controllers/url.js";

export const router = express.Router();

router.post("/", generalShortUrl);

router.get("/:shortId", redirectUrl);

router.get("/analytics/:shortId", getAnalytics);
