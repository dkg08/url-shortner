const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortUrlId(req, res) {
  const { url: redirectUrl } = req.body;
  if (!redirectUrl) {
    return res.status(400).json({ msg: "url is required" });
  }
  const shortId = shortid.generate();
  const entry = await URL.create({ shortId, redirectUrl, visitHistory: [] });
  return res.status(200).json({ shortid: entry.shortId });
}

async function handleRequestAnalytics(req, res) {
  const { id: shortId } = req.params;
  const result = await URL.findOne({ shortId });
  if (!result) {
    return res.status(400).json({ msg: "no data found" });
  }
  res
    .status(200)
    .json({
      totalRequest: result.visitHistory.length,
      analytics: result.visitHistory,
    });
}

module.exports = {
  handleRequestAnalytics,
  handleGenerateShortUrlId,
};
