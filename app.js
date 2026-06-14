import express from "express";

const app = express();

app.use(express.urlencoded());
app.use("/add-product", (req, res, next) => {
  res.send(`<form action="/product" method="POST">
            <input type="text" name="title" />
            <button type="submit">Submit</button>
            </form>`);
});
app.use("/product", (req, res, next) => {
  console.log(req.body.title);
  res.redirect(`/`);
});
app.use("/", (req, res, next) => {
  res.send(`<h1>Hello from Express</h1>`);
});

app.listen(3000);
