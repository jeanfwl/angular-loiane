const express = require("express");
const multipart = require("connect-multiparty");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: "*",
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

const multipartMiddleware = multipart({ uploadDir: "./uploads" });

app.post("/upload", multipartMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  res.json({ nessage: files });
});

app.get("/downloadExcel", (_, res) => {
  res.download("./uploads/report.excel");
});

app.get("/downloadPDF", (_, res) => {
  res.download("./uploads/report.pdf");
});

app.use((err, req, res, next) => res.json({ error: err.message }));

app.listen(8000, () => {});
