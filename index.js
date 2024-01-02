require("dotenv").config();
const express = require("express");
const app = express();
const { connectToDb } = require("./dbConnection");
const urlRouter = require("./routes/url");
const URL = require("./models/url");

connectToDb(process.env.MONGO_URL).then(() => console.log("connected to DB"));

app.use(express.json());

app.use("/url", urlRouter);

app.get("/:id", async (req, res) => {
  const shortId = req.params.id;
  if (!shortId) {
    return res.status(400).json({ msg: "enter a valid id" });
  }
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );
  if (!entry) {
    return res.status(404).json({ msg: "Entry not found" });
  }

  res.redirect(entry.redirectUrl);
});

app.listen(process.env.PORT, () =>
  console.log(`server running @http://localhost:${process.env.PORT}`)
);
