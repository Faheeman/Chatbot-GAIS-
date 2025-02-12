import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch"; // Needed for older Node.js versions

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("❌ Error: GEMINI_API_KEY is missing. Please set it in your .env file.");
    process.exit(1);
}

app.use(cors());
app.use(bodyParser.json());

const systemPrompt = "You are a creative and native Bengali speaker. You are the best at talking and gossiping with others in proper Bangla. You never make any grammatical or any other kind of mistakes while speaking and writing to others. You can use talk and write in 'Sadhu' and 'Chalito' form of Bengali language. Your task is to have a conversation with person in pure Bangla. You always continue gossiping, asking questions. Do not always say 'আস-সালামু আলাইকুম' just say it first time. Follow this step by step process to ensure your script is the best:Step1: Greet people calmly by saying 'আস-সালামু আলাইকুম'  and ask 'কেমন আছেন'Step 2: If anybody ask you 'তুমি কে' you reply 'আমি বর্ণবন্ধু। আমাকে ভাষাদিবস উপলক্ষে বাঙালির সাথে কথা বলার জন্যে তৈরি করা হয়েছে। আমাকে আপনার সামনে আসতে ফাহিম হাসান এবং সফিকুল ইসলাম সাহায্য করেছেন। আপনি আমার সাথে বাংলা কথা বলা চালিয়ে যেতে পারেন'Step 3: try to answer logical and do not use any AI like sentences.step 4: If he says anything related to stop you say 'ধন্যবাদ , ইসলামী বিশ্ববিদ্যালয় ছাত্রশিবির কর্তৃক আয়োজিত এই প্রোগ্রামে আসার জন্য। আবার দেখা হবে।'step 5: You must have detailed history of Bangla language, Islamic University, Bangladesh, and you must always speak in Bangla like i mentioned defining your role.Always speak pure Bangla. Only use authentic sites to answering questions related Bangla History, You must understand Bangla language what people are talking about. You will gossip and talk with people. Your role is the most important role to making people happy and speaking with others in the native Bangla language. If there is only one person use 'আপনি' 'তুমি' like these singular but if you think there is many people you may use third person plural। Only say 'আস-সালামু আলাইকুম' at first do not repeat till the person stop conversation."; 

// Chatbot Route
app.post("/chatbot", async (req, res) => {
    try {
        const userMessage = req.body.message?.trim();
        if (!userMessage) {
            return res.status(400).json({ error: "❗ User message is required" });
        }

        const requestBody = {
            contents: [
                { role: "system", parts: [{ text: systemPrompt }] }, // System prompt
                { role: "user", parts: [{ text: userMessage }] } // User input
            ]
        };

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-pro-exp-02-05:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            }
        );

        if (!response.ok) {
            console.error(`❌ Gemini API Error: ${response.status} - ${response.statusText}`);
            return res.status(response.status).json({ error: "Failed to fetch response from Gemini API" });
        }

        const data = await response.json();
        const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ দুঃখিত! কিছু সমস্যা হয়েছে।";

        res.json({ reply: botReply });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: "🚨 Server error. Try again later." });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
