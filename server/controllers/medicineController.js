// medicine search logic here information
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

// getMedicineinfo
const getMedicineInfo = async (req, res) => {
  try {
    const { medicineName, type } = req.body;

    if (!medicineName) {
      return res.status(400).json({
        success: false,
        message: "Please provide medicine name",
      });
    }

    let prompt = "";
    switch (type) {
      case "uses": {
        prompt = `What are the uses of medicine "${medicineName}"? Respond in JSON format.`;
        break;
      }

      case "side-effects": {
        prompt = `What are the side effects of medicine "${medicineName}"? Respond in JSON format.`;
        break;
      }
      case "dosage": {
        prompt = `What is the general dosage of medicine "${medicineName}"? Respond in JSON format.`;
        break;
      }
      default: {
        prompt = `Provide complete information about medicine "${medicineName}" in valid JSON format only. Include:
                - name
                - uses (array)
                - dosage (string)
                - sideEffects (array)
                - precautions (array)
                - warnings (array)
                - interactions (array)
                - storageInstructions (string)
                - missedDose (string)
                
                Respond ONLY valid JSON, no other text.`;
      }
    }
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,

          "Content-Type": "application/json",
        },
      },
    );
    const aiResponse = response.data.choices[0].message.content;

    // extract json logic
    let jsonLogic = aiResponse.match(/\{[\s\S]*\}/);

    let parseData;
    if (jsonLogic) {
      try {
        parseData = JSON.parse(jsonLogic[0]);
      } catch (e) {
        console.log(e);
        parseData = { raw: aiResponse };
      }
      res.status(200).json({
        success: true,
        data: parseData,
      });
    } else {
      console.log("Json not working");
      return res.status(200).json({
        success: false,
        message: "AI did not return valid JSON",
        raw: aiResponse,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = getMedicineInfo;
