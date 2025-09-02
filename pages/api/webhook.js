// pages/api/webhook.js

let lastPayload = null; // store last payload in memory (resets on new deployment)

export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ POST request → receive payload
  if (req.method === "POST") {
    try {
      const payload = req.body;
      lastPayload = payload; // store latest payload

      console.log("📥 Received payload:", payload); // shows up in Vercel logs

      return res.status(200).json({
        success: true,
        message: "Payload received successfully ✅",
        received: payload, // echo back to frontend
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: "Invalid JSON payload",
      });
    }
  }

  // ✅ GET request → health/status + last payload if available
  if (req.method === "GET") {
    return res.status(200).json({
      status: "running",
      timestamp: new Date().toISOString(),
      lastPayload: lastPayload || "No payload received yet",
    });
  }

  // ❌ Other methods
  res.setHeader("Allow", ["GET", "POST", "OPTIONS"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
