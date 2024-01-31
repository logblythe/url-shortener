import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timeStamp: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Url = mongoose.model("Url", urlSchema);
