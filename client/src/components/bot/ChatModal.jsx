import { useState } from "react";
import botIcon from "../../assets/bot.png";

export default function ChatModal() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      console.log("📨 Gönderilen mesaj:", input);

  const res = await fetch("http://localhost:5001/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: input }),
});


      console.log("📡 Sunucu yanıtı status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ API'den hata yanıtı:", errorText);
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: "Sunucudan geçerli yanıt alınamadı. (Hata kodu: " + res.status + ")" },
        ]);
        return;
      }

      const data = await res.json();
      console.log("✅ Backend'ten gelen veri:", data);

      const botMessage = { role: "bot", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("⚠️ İstek gönderilirken hata:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Bir hata oluştu. Lütfen tekrar deneyin." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔘 Chat butonu */}
<button
  onClick={toggleModal}
  className="fixed bottom-5 right-2 p-0 m-0 w-24 h-24 z-50"
>
  <img
    src={botIcon}
    alt="Chatbot"
    className="w-full h-full object-contain"
  />
</button>



      {/* 💬 Modal */}
    {open && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40">
    <div className="w-full max-w-2xl h-[80vh] bg-gray-800/70 backdrop-blur-md rounded-xl p-6 flex flex-col shadow-2xl relative">
      {/* ❌ Kapat */}
      <button
        onClick={toggleModal}
        className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl"
      >
        ✖
      </button>

      <h2 className="text-xl font-semibold text-white mb-4">Polonya AI Destek</h2>

      <div className="flex-1 overflow-y-auto space-y-3 p-4 rounded bg-gray-700/50 border border-gray-600 text-white">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded text-sm ${
              msg.role === "user"
                ? "bg-red-400/30 text-right"
                : "bg-white/20 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-sm italic text-gray-300">Yükleniyor...</div>}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-gray-900 text-white border border-gray-600 rounded px-3 py-2 placeholder-gray-400"
          placeholder="Polonya hakkında soru sor..."
        />
        <button
          onClick={sendMessage}
          className="bg-red-500 hover:bg-red-600 text-white px-4 rounded"
        >
          Gönder
        </button>
      </div>
    </div>
  </div>
)}


    </>
  );
}
