import https from "https";
import express from "express";
import { extractContents, extractTitle, extractLink } from "./utils/extract.js";
const server = express();

server.get("/get-time-stories", (request, response) => {
  const options = {
    hostname: "time.com",
    port: 443,
    method: "GET",
  };
  let latestStories = [];

  const req = https.request(options, (res) => {
    let data = "";

    res
      .on("data", (d) => {
        data += d;
      })
      .on("end", () => {
        const result = extractContents(data);

        if (result) {
          result.map((snippet) => {
            const title = extractTitle(snippet);
            const link = extractLink(snippet);

            latestStories.push({
              title,
              link,
            });
          });
        }

        response.json(latestStories);
      });
  });

  req.on("error", (error) => {
    response.json({ message: error });
  });

  req.end();
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
