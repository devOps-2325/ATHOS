import express from "express";
import { db } from "../config/firebase.js"; // ✅ Firestore instance
import admin from "firebase-admin"; // ✅ Import admin from Firebase SDK
import nodemailer from "nodemailer";

const router = express.Router();

// ✅ Send OTP API
router.post("/send-otp", async (req, res) => {
    console.log("📩 /send-otp API was called!");

    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required!" });

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    console.log(`✅ OTP generated: ${otp}`);

    try {
        // ✅ Store OTP in Firestore
        await db.collection("otps").doc(email).set({
            otp,
            createdAt: admin.firestore.FieldValue.serverTimestamp(), // ✅ Fix: `admin` was missing
        });

        console.log("📧 Sending OTP email...");

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Athos FitQuest OTP",
            text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
        });

        console.log("✅ Email sent successfully!");
        res.json({ success: true, message: "OTP sent to email!" });
    } catch (error) {
        console.error("❌ Error sending OTP email:", error);
        res.status(500).json({ error: "Error sending OTP email." });
    }
});

export default router;
