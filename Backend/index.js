const cors = require("cors");
const express = require("express");
const route = require("./Routes.js");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static("file"));

app.use(cors());
app.use(express.json());
app.use(route);
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
