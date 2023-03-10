// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// export default async function OpenAIFunction() {
//   const response = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "Say this is a test",
//     temperature: 0,
//     max_tokens: 7,
//   });
//   return response;
// }

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: "org-39jOEbNOmJMtFfMxtzKRFBA7",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default openai;
