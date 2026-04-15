const axios = require("axios");

const ayurvedicChat = async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message);

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message",
      });
    }

    const systemPrompt = `You are "AyurAI", an expert Ayurvedic practitioner with deep knowledge of ancient healing traditions. 
    
Your role:
- Provide holistic, natural remedies based on Ayurvedic principles.
- Explain doshas (Vata, Pitta, Kapha) and recommend balancing practices.
- Suggest herbs, dietary changes, and lifestyle modifications.
- Always include a gentle disclaimer to consult a qualified practitioner for serious conditions.
- Keep responses warm, compassionate, and educational.

Format your responses with clear sections using bullet points or numbered lists when appropriate.`;
let aiReply ="";
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "meta-llama/llama-3-8b-instruct", // or your preferred model
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 800,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

       aiReply = response.data.choices[0].message.content;
      console.log(aiReply);
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({
      success: true,
      reply: aiReply,
    });
  } catch (error) {
    console.error(
      "Ayurvedic Chat Error:",
      error.response?.data || error.message,
    );
    res.status(500).json({
      success: false,
      message: "Failed to get response from AI",
      error: error.message,
    });
  }
};

module.exports = { ayurvedicChat };
