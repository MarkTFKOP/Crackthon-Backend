
import { Request } from "express";
import models from "../models";
import openAI from "../Helper/openAI";
import fs from 'fs'
import axios from 'axios'
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
  async testing(req: any, res: any) {
    try {  
        // const response = await openAI.createImageVariation(
        //     req.file, 
        //     1,
        //     "512x512"
        //   );
        let token:string 
        = process.env.OPENAI_API_KEY ||"";
        let data:any = {
            image: req.file, 
            "n": 1,
            "size": "1024x1024" 
        }
        const response:any = await axios.post("https://api.openai.com/v1/images/variations",
        data,
         { headers: 
            {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": 'multipart/form-data'} });
        // const  image_url = response.data.data[0].url;
      res.success.success(`Success`);
    } catch (error:any) {
        console.log("error",error.response);
        
        return res.error.ServerError("Something went wrong");
        return res.error(
            error.response.status,

            error.message,
            error.response.data
          );
    }
  }
}

export default new OpenAI()