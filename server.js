import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import otpRoutes from "./routes/otpRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use API Routes with `/api` prefix
app.use("/api", otpRoutes);
app.use("/api", leaderboardRoutes);

// ✅ Health Check Route
app.get("/", (req, res) => {
    res.send("🔥 Athos FitQuest Backend is Running!");
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
app.use(express.static("public")); // ✅ Serve leaderboard.html
