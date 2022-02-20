import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});
