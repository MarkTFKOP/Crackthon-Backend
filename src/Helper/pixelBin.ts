import { Request, Response } from "express";
// import the PixelbinConfig and PixelbinClient
const { PixelbinConfig, PixelbinClient } = require("@pixelbin/admin");

// Create a config with you API_TOKEN
const config = new PixelbinConfig({
  domain: "https://api.pixelbin.io",
  apiSecret: "36941088-0758-4c9f-83b4-6ab1bda77236",
});

// Create a pixelbin instance
const pixelbin = new PixelbinClient(config);

export async function getPixelBinData() {
  try {
    // list the assets stored on your organization's Pixelbin Storage
    console.log("Start");

    const explorer = pixelbin.assets.listFilesPaginator({
      onlyFiles: true,
      pageSize: 5,
    });
    console.log("Start");
    console.log("Start", explorer.hasNext());
    while (explorer.hasNext()) {
      const { items, page } = await explorer.next();
      console.log(page.current); // 1
      console.log(page.hasNext); // false
      console.log(page.size); // 3
      console.log(items.length); // 3
      console.log(items); // 3
    }
  } catch (err) {
    console.log(err);
  }
}
