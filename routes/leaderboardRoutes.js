import express from "express";
import { db } from "../config/firebase.js"; // ✅ Ensure Firestore is properly imported

const router = express.Router();

// ✅ Register User Route
router.post("/register-user", async (req, res) => {
    const { username, email, birthdate, height, weight, gym, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const userRef = db.collection("users").doc(email);
        const userSnap = await userRef.get();

        if (userSnap.exists) {
            return res.status(400).json({ error: "User already exists!" });
        }

        await userRef.set({
            username,
            birthdate,
            height,
            weight,
            gym,
            password,
            xp: 0 // ✅ Users start with 0 XP
        });

        res.json({ success: true, message: "User registered successfully!" });
    } catch (error) {
        console.error("❌ Error registering user:", error);
        res.status(500).json({ error: "Error registering user." });
    }
});

// ✅ Update XP for a user
router.post("/update-xp", async (req, res) => {
    const { email, xpAmount } = req.body;

    if (!email || xpAmount === undefined) {
        return res.status(400).json({ error: "Missing email or XP amount" });
    }

    try {
        const userRef = db.collection("users").doc(email);
        const userSnap = await userRef.get();

        if (!userSnap.exists) {
            return res.status(404).json({ error: "User not found" });
        }

        const currentXP = userSnap.data().xp || 0;
        await userRef.update({ xp: currentXP + xpAmount });

        res.json({ success: true, message: `Added ${xpAmount} XP to ${email}` });
    } catch (error) {
        console.error("❌ Error updating XP:", error);
        res.status(500).json({ error: "Error updating XP" });
    }
});

// ✅ Get the Top 5 Users (Leaderboard)
router.get("/leaderboard", async (req, res) => {
    try {
        const usersRef = db.collection("users");
        const querySnapshot = await usersRef.orderBy("xp", "desc").limit(5).get();

        const leaderboard = [];
        querySnapshot.forEach((doc) => {
            leaderboard.push({
                username: doc.data().username,
                xp: doc.data().xp,
            });
        });

        res.json({ success: true, leaderboard });
    } catch (error) {
        console.error("❌ Error fetching leaderboard:", error);
        res.status(500).json({ error: "Error fetching leaderboard" });
    }
});

export default router;


