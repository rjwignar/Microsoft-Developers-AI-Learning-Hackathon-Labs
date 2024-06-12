require('dotenv').config();

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const client = new OpenAIClient(
    process.env.AZURE_OPENAI_SERVICE_ENDPOINT,
    new AzureKeyCredential(process.env.AZURE_OPENAI_SERVICE_KEY)
);

const chatResponse = client.getChatCompletions(
    process.env.AZURE_OPENAI_SERVICE_DEPLOYMENT, // deployment name
    [
        { role: "system", content: "You are a helpful, fun and friendly sales assistant for Cosmic Works, a bicycle and bicycle accessories store." },
        { role: "user", content: "Do you sell bicycles?" },
        { role: "assistant", content: "Yes, we do sell bicycles. What kind of bicycle are you looking for?" },
        { role: "user", content: "I'm not sure what I'm looking for. Could you help me decide?" }
    ]);

chatResponse.then((result) => {
    for (const choice of result.choices) {
        console.log(choice.message.content);
    }
}).catch((err) => console.log(`Error: ${err}`));