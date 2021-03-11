const express = require("express");
const mongoose = require("mongoose");

// Example mongodb connection
mongoose.connect(
    `mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("connected"));

// Example express server
const app = express();
const port = 3000;

app.get("/", (req: any, res: { send: (arg0: string) => void; }) => {
    res.send("DB_HOST" + process.env.DB_HOST);
});

app.listen(port, (err: any) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});