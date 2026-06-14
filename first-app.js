import { createServer } from "http";

const server = createServer((req, res) => {
  console.log("req url =>", req.url);
  console.log("req method =>", req.method);
  console.log("req headers =>", req.heades);

  const url = req.url;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(`<body>
                <form action="/message" method="POST">
                  <input type="text" name="message" />
                  <button type="submit">Submit</button>
                </form>
              </body>
            `);
    res.write("</html>");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");

  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
