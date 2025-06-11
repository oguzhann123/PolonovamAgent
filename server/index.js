import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch"; // npm install node-fetch@2

dotenv.config();

const app = express();

// 🔐 Güçlü CORS ayarı (403 hatasını engeller)
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// ✅ Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "CORS çalışıyor!" });
});

// 🔁 Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    console.log("📤 Kullanıcı mesajı:", message);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: "Sen Polonya hakkında uzman bir asistansın. Kullanıcının sorularını doğru ve sade cevapla."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("🚨 OpenRouter API Hatası:", errorText);
      return res.status(500).json({ error: "OpenRouter'dan geçerli yanıt alınamadı." });
    }

    const data = await response.json();
    console.log("📡 OpenRouter yanıtı:", data);

    const reply = data.choices?.[0]?.message?.content || "Üzgünüm, bir cevap veremedim.";
    res.json({ reply });

  } catch (err) {
    console.error("❌ Sunucu hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server çalışıyor: http://localhost:${PORT}`);
});
