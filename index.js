import router from "./routes/route.js";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())

const hostname = '127.0.0.1';
const port = 5001;

app.use(router);

app.listen(port, hostname, function() {
  console.log('Server running at http://'+ hostname + ':' + port + '/');
});