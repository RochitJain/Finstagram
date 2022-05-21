const cors = require("cors");
const express = require("express");
const route = require("./Routes.js");
const path = require('path')
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.static);
app.use(express.json());

if(process.env.NODE_ENV==='production'){
  app.use(express.static("client/build"));
}
app.get(*,)
app.use(route);
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
