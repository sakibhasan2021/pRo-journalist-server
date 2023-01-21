const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json()); //when we post,, convert file json automatically

const port = process.env.PORT || 5001;
app.get("/", (req, res) => {
  res.send("running");
});

app.listen(port, () => {
  console.log(`${port} is running`);
});
