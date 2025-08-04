const validModels = [
  "Qwen/Qwen3-235B-A22B-Instruct-2507",
  "Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8",
  "deepseek-coder",
  "llama-3.1-405b-instruct",
  "gemma-3-27b-it",
  "deepseek-ai/DeepSeek-R1"
];

export default {
  async fetch(request) {
    const { searchParams } = new URL(request.url);
    const prompt = searchParams.get("prompt");
    const model = searchParams.get("model");

    if (!prompt) {
      return new Response("Missing 'prompt' parameter.", { status: 400 });
    }

    if (!model || !validModels.includes(model)) {
      const modelList = validModels.map(m => `- ${m}`).join("\n");
      return new Response(
        `❌ Invalid or missing 'model'.\n\n✅ Available Models:\n${modelList}`,
        {
          status: 400,
          headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    const apiKey = "cpk_6877d13cf4b04559bd30a16be0467fcf.c6e6fd63bd8f5bccb4e433d0fa0aeef0.0S768FePcaFCHCmT6qm7JceuTVtDIQ78";

    const bodyData = {
      model: model,
      messages: [
        {
          role: "user",
          content: prompt,
        }
      ]
    };

    const response = await fetch("https://api.chutes.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });

    const resData = await response.text();

    return new Response(resData, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
