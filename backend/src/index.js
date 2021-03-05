const express = require("express");

const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("DB_HOST" + process.env.DB_HOST);
});
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
