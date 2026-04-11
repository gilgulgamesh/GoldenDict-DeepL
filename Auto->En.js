// DeepL-Maori-to-English-with-usage.js
const axios = require("axios");
require("dotenv").config({ path: __dirname + "/.env", quiet: true });

const input = (process.argv[2] ?? "").trim();
if (!input) { console.error('Usage: node DeepL-Maori-to-English-with-usage.js "text in Māori"'); process.exit(1); }
if (!process.env.DEEPL_AUTH_KEY) { console.error("Missing DEEPL_AUTH_KEY in environment"); process.exit(1); }

const translatePayload = { text: [input], target_lang: "EN-US" };

const translateReq = {
  method: "post",
  url: "https://api-free.deepl.com/v2/translate",
  headers: {
    Authorization: `DeepL-Auth-Key ${process.env.DEEPL_AUTH_KEY}`,
    "Content-Type": "application/json",
  },
  data: JSON.stringify(translatePayload),
  maxBodyLength: Infinity,
  timeout: 15000,
};

const usageReq = {
  method: "get",
  url: "https://api-free.deepl.com/v2/usage",
  headers: { Authorization: `DeepL-Auth-Key ${process.env.DEEPL_AUTH_KEY}` },
  maxBodyLength: Infinity,
  timeout: 10000,
};

Promise.all([axios.request(translateReq), axios.request(usageReq)])
  .then(([translateRes, usageRes]) => {
    const t = translateRes?.data?.translations?.[0]?.text ?? "";
    const detected = translateRes?.data?.translations?.[0]?.detected_source_language ?? "MI";
    const charCount = usageRes?.data?.character_count;
    const charLimit = usageRes?.data?.character_limit;

    console.log(`[${detected}] ${input} <hr> [EN] ${t}`);
    console.log();
    let pctText = "N/A";
    if (typeof charCount === 'number' && typeof charLimit === 'number' && charLimit > 0) {
      const pct = Math.round((charCount / charLimit) * 1000) / 10; // one decimal
      pctText = `${pct}%`;
    }

    console.log();
    console.log(`<div style="text-align:end;padding:5px 5px 0;">${pctText}</div>`);


  })
  .catch((err) => {
    if (err.response) console.error("DeepL error:", err.response.status, err.response.data);
    else console.error("Request error:", err.message || err);
    process.exit(1);
  });
