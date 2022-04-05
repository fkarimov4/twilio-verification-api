require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { send2FA, verify2FA } = require("./functions");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/2fa", send2FA);
app.post("/2fa/verify", verify2FA);

app.listen(port, () => console.log(`Listening on port ${port}`));
