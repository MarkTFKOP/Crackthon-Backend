// var fs = require("fs"),
//   http = require("http"),
//   https = require("https");

// var Stream = require("stream").Transform;

// export default function downloadImage(url: any, filename: any) {
//   var client = http;
//   if (url.toString().indexOf("https") === 0) {
//     client = https;
//   }

//   client
//     .request(url, function (response: any) {
//       var data = new Stream();

//       response.on("data", function (chunk: any) {
//         data.push(chunk);
//       });

//       response.on("end", async function () {
//         await fs.writeFileSync(filename, data.read());
//         return data.read();
//       });
//     })
//     .end();
// }
  
import http from "http";
import https from "https";
import fs from "fs";
export default function downloadImage(url: any) {
  return new Promise((resolve: any, reject: any) => {
    const protocol = url.startsWith("https") ? https : http;
    protocol
      .get(url, (response: any) => {
        const contentType = response.headers["content-type"];
        const fileName = url.split("/").pop();
        const fileStream = fs.createWriteStream(fileName);
        response.pipe(fileStream);
        fileStream.on("finish", () => {
          const data = fs.readFileSync(fileName);
          const object = {
            contentType,
            data,
          };
          fs.unlinkSync(fileName);
          resolve(object);
        });
      })
      // .on("error", (error: any) => {
      //   reject(error);
      // });
  });
}
