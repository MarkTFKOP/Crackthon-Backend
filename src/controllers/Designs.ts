import axios from "axios";
import { Request } from "express";
import downloadImage from "../Helper/DownloadImage";
import openai from "../Helper/openAI";
import { getPixelBinData } from "../Helper/pixelBin";
import models from "../models";
const clothesModel = models.Clothes;
class Designs {
  async simpleGenerateDesigns(req: Request, res: any) {
    try {
      //   console.log(await openai.listEngines());
      const response = await openai.createImage({
        prompt: req.body.Text,
        n: Number(req.body.number) ?? 1,
        size: "512x512",
      });
      return res.success.success("Success", response.data.data);
    } catch (error: any) {
      //   console.log("error", error.message);
      return res.error(
        error.response.status,
        error.message,
        error.response.data
      );
    }
  }
  async generateDesigns(req: Request, res: any) {
    try {
      const clothes = await clothesModel.aggregate([
        { $match: { isDeleted: false, isActive: true } },
        {
          $project: {
            productName: 1,
            productImage: 1,
            description: 1,
            // intervalAnalysis:1
          },
        },
        { $limit: 5 },
      ]);
      const imageArray :any= [];
      for (const i of clothes) { 
        const imageHolder:any  = await downloadImage(i.productImage)
        imageArray.push({
          originalname:i.productName,
          fieldname: i.productName,
          encoding: '7bit',
          mimetype: imageHolder.contentType,
          Buffer: imageHolder.data
      });
      } 
      const response = await openai.createImageVariation({
       image :req.file,
       n: 1,
       size: "512x512"
      }).catch((e)=>{console.log(e);
      });
       
      // const image_url: any = response.data;
      return res.success.success("Success", { clothes,  });
    } catch (error) { 
      return res.error.ServerError("Something went wrong", error);
    }
  }
  async getPixel(req: Request, res: any) {
    try {
      await getPixelBinData();
      return res.success.success("Success");
    } catch (error) {
      console.log(error);
      return res.error.ServerError("Something went wrong");
    }
  }
  async generateDesignsWithOpenAI(req: Request, res: any) {
    try {
      const {Text} = req.body;
      console.log(Text);
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: Text,
      });
      console.log(completion.data);
      const data:any = completion.data.choices[0].text?.replace('\n\n','')

      const response = await openai.createImage({
        prompt: data,
        n: 1,
        size: "1024x1024",
      });
      const image_url:any = response.data.data[0].url;
      return res.success.success("Success",{
        Text:Text,
        prompt: data,
        image :image_url
      });
    } catch (error) {
      console.log(error);
      return res.error.ServerError("Something went wrong");
    }
  }
  async imageUpload(req: any, res: any) {
    try {
      console.log("req.file", req.file);
      console.log("req.images", req.imageURL);
      return res.success.success("Success");
    } catch (error) {
      console.log(error);
      return res.error.ServerError("Something went wrong");
    }
  }
}
export default new Designs();




// const response = await openai.createImageVariation(
      //   imageArray[0],
      //   1,
      //   "512x512"
      // );
      // console.log(response);



      // let token:string 
      //   = process.env.OPENAI_API_KEY ||"";
      //   const data:any = {
      //       image: imageArray[0], 
      //       "n": 1,
      //       "size": "512x512" 
      //   }
      //   const response:any = await axios.post("https://api.openai.com/v1/images/variations",
      //   data,
      //    { headers: 
      //       {
      //           "Authorization" : `Bearer ${token}`,
      //           "Content-Type": 'multipart/form-data'} 
      //         }
      //         ).catch((e)=>{console.log(e.response,"cathc");
      //         }); 
      // const image_url: any = response.data;