const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.chatWithBot = async (req, res) => {
  try {
    const prompt = req.body.prompt || "What do you see in this image?";
    let base64ImageUrl = null;

    // If image is uploaded, convert to base64
    if (req.file) {
      const filePath = path.join(__dirname, `../uploads/${req.file.filename}`);
      const imageBuffer = fs.readFileSync(filePath);
      const base64 = imageBuffer.toString("base64");

      // Detect MIME type
      const mimeType = req.file.mimetype || "image/jpeg"; // fallback

      base64ImageUrl = `data:${mimeType};base64,${base64}`;
    }

    const messages = [
      {
        role: "system",
        content: "You are a medical chatbot for mothers, specialized in kids' health and gynecology.but you must give to the point response , easy for mothers "
      },
      {
        role: "user",
        content: base64ImageUrl
          ? [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: base64ImageUrl } }
            ]
          : [{ type: "text", text: prompt }]
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages,
      max_tokens: 300
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
