
import { Request } from "express";
import models from "../models";
import openAI from "../Helper/openAI";
const clothesModel = models.Clothes;

class OpenAI {
  async generateText(req: Request, res: any) {
    try { 
      const {Text} = req.body;
      console.log(Text);
      const completion = await openAI.createCompletion({
        model: "text-davinci-003",
        prompt: Text,
      });
      console.log(completion.data);
      const data:any = completion.data.choices[0].text?.replace('\n\n','')
      res.success.success(`Success`,{input:Text ,Output:`${data}`});
    } catch (error:any) {
        return res.error(
            error.response.status,
            error.message,
            error.response.data
          );
    }
  }
}

export default new OpenAI()