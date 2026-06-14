import { createServer } from "http";
import routes from "./routes.js";

const server = createServer(routes);

server.listen(3000);
