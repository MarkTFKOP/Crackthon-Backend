import { Request, Response } from "express";
// import the PixelbinConfig and PixelbinClient
const { PixelbinConfig, PixelbinClient } = require("@pixelbin/admin");

// Create a config with you API_TOKEN
const config = new PixelbinConfig({
  domain: "https://api.pixelbin.io",
  apiSecret: "36941088-0758-4c9f-83b4-6ab1bda77236",
});
const pixelbin = new PixelbinClient(config);

export default async function uploadPixelBin(
  req: any,
  response: any,
  next: any
) {
  try {
    const { Readable } = require("stream");
    const res = await pixelbin.assets.fileUpload({
      file: Readable.from(req.file.buffer),
      name: `Image_${new Date().toISOString()}`,
      options: { originalFilename: req.file.originalname },
      overwrite: true,
    });
    req.body[req.file.fieldname] = res.url;
    next();
    // return res;
  } catch (error) {
    console.log(error);
  }
}
