import { createServer } from "http";
import routes from "./routes.js";
import express from "express";

const app = express();
const server = createServer(app);

server.listen(3000);
