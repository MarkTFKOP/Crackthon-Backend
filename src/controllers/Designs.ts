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
            intervalAnalysis:1
          },
        },
        { $limit: 5 },
      ]);
      let imageArray = [];
      for (let i of clothes) {
        // console.log("mark", i.productImage, `${i.productName}.png`);
        let thiss:any  = await downloadImage(i.productImage)
        imageArray.push({
          originalname:i.productName,
          fieldname: i.productName,
          encoding: '7bit',
          mimetype: thiss.contentType,
          Buffer: thiss.data
      });
      }
      console.log("imageArray", req.file);
      const response: any = await openai.createImageVariation(
        // imageArray[0],
        req.file,
        1,
        "512x512"
      );
      console.log(response);
      
      const image_url: any = response.data.data[0].url;
      return res.success.success("Success", { clothes, image_url });
    } catch (error) {
      //   console.log(error);
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
