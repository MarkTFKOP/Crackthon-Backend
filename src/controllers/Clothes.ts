import { Request } from "express";
import models from "../models";
const clothesModel = models.Clothes;

class Clothing {
  async getAllClothes(req: Request, res: any) {
    try {
      const clothingItems = await clothesModel
        .find({
          isActive: true,
          isDeleted: false,
        })
        .select("productName productImage description");
      res.success.success(`All products`, clothingItems);
    } catch (error) {
      console.log(error);
      return res.error.ServerError("Something went wrong");
    }
  }
  async AddClothes(req: Request, res: any) {
    try {
      let createObj = {};
      Object.assign(createObj, { productName: req.body.productName });
      Object.assign(createObj, { productImage: req.body.productImage });
      Object.assign(createObj, { description: req.body.description });
      await clothesModel.create(createObj);
      return res.success.success("Product Added Succesfully");
    } catch (error) {
      console.log(error);
      return res.error.ServerError("Something went wrong");
    }
  }
  async check(req: Request, res: any) {
    try {
      return res.success.success("Success");
    } catch (error) {
      console.log(error);
      return res.error.ServerError("Something went wrong");
    }
  }
  async lookout(req: Request, res: any) {
    try {
      let findId :any= {};
      Object.assign(findId, { _id: req.params.id });
      await clothesModel.updateOne(findId, {
        $inc: { "intervalAnalysis.views": 1 },
      });
      return res.success.success("Success");
    } catch (error) {
      console.log(error);
      return res.error.ServerError("Something went wrong");
    }
  }
  async purchase(req: Request, res: any) {
    try {
      let findId = {};
      Object.assign(findId, { _id: req.params.id });
      await clothesModel.updateOne(findId, {
        $inc: { "intervalAnalysis.purchases": 1 },
      });
      return res.success.success("Success");
    } catch (error) {
      console.log(error);
      return res.error.ServerError("Something went wrong");
    }
  }
}
export default new Clothing();
