// import router from "./routes/route.js";
// import cors from "cors";
// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();
// const app = express()
// app.use(cors())
// app.use(express.json())

// const hostname = '127.0.0.1';
// const port = 5001;

// app.use(router);

// app.listen(port, hostname, function() {
//   console.log('Server running at http://'+ hostname + ':' + port + '/');
// });


import router from "./routes/route.js";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { join } from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import serveStatic from "serve-static";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const isProd = process.env.NODE_ENV === "production"
const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/build`
    : `${process.cwd()}/frontend/`;
const app = express()
app.use(cors())
app.use(express.json())
const port = 5001;
app.use("/api",router);

if(isProd){
  app.use(serveStatic(STATIC_PATH, { index: false }));
  app.use("*", async (_req, res, _next) => {
    return res
      .status(200)
      .set("Content-Type", "text/html")
      .send(readFileSync(join(STATIC_PATH, "index.html")));
  });
}
app.listen(port, function() {
  console.log('Server running at '+port);
});