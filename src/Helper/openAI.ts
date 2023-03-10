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


import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  organization: "org-39jOEbNOmJMtFfMxtzKRFBA7",
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

export default openai;
