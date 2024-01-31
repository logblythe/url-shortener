import { nanoid } from "nanoid";
import { Url } from "../models/url.js";

export const generalShortUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    res.status(400).json({ error: "Url is required" });
  }
  const existingEntry = await Url.findOne({ redirectUrl: url });
  if (existingEntry) {
    res.status(200).json({ shortId: existingEntry.shortId });
  } else {
    const id = nanoid(8);
    const entry = await Url.create({
      shortId: id,
      redirectUrl: url,
      visitHistory: [],
    });
    res.status(201).json({ shortId: entry.shortId });
  }
};

export const redirectUrl = async (req, res) => {
  const { shortId } = req.params;
  if (!shortId) {
    res.status(400).json({ error: "ShortId is required" });
  }
  const entry = await Url.findOne({ shortId });
  if (!entry) {
    res.status(404).json({ error: "No url found" });
  } else {
    await Url.updateOne(
      { shortId },
      { $push: { visitHistory: { timeStamp: Date.now() } } }
    );
    res.redirect(entry.redirectUrl);
  }
};

export const getAnalytics = async (req, res) => {
  const { shortId } = req.params;
  if (!shortId) {
    res.status(400).json({ error: "ShortId is required" });
  }
  const entry = await Url.findOne({ shortId });
  if (!entry) {
    res.status(404).json({ error: "No url found" });
  } else {
    res.status(200).json({
      totalClicks: entry.visitHistory?.length,
      visitHistory: entry.visitHistory,
    });
  }
};
