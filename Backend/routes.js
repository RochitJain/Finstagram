const express = require("express");
const route = new express.Router();
const multer = require("multer");
const User = require("./userEntity");
const auth = require("./auth");

const File = require("./files");

const upload = multer({});
route.post("/upload", auth, upload.single("file"), async (req, res) => {
  const file = new File(req.file);
  file.file = await req.file.buffer;
  file.title = await req.body.filename;
  file.desc = await req.body.filedesc;
  file.name = await req.file.originalname;
  file.type = await req.file.mimetype;
  file.email = await req.body.email;
  await file.save();
  res.send({ file: req.file, message: " File Uploaded" }).status(200);
});

route.post("/login", async (req, res) => {
  try {
    const user = await User.checkCredential(req.body.email, req.body.password);
    if (!user) {
      throw new Error("User not found");
    }
    const token = await user.generateToken();

    if (!token) {
      throw new Error("Token not generated");
    }
    res.send({ auth: true, token }).status(200);
  } catch (e) {
    console.log(e);
  }
});

route.delete("/delete/:id", auth, async (req, res) => {
  try {
    const result = await File.findById(req.params.id);
    await result.remove();
    if (result) {
      await res.send({ message: "File Deleted", status: 200 }).status(200);
    } else {
      await res.send({ message: "Record not found", status: 400 }).status(400);
    }
  } catch (e) {
    res.send({ message: e, status: 404 }).status(404);
  }
});

route.get("/files/:id", auth, async (req, res) => {
  try {
    const filesList = await File.find({ email: req.params.id });
    res.send({ message: "SEND", files: filesList }).status(200);
  } catch (e) {
    console.log(e);
    res.send({ message: e }).status(400);
  }
});

route.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send({ message: "User saved", status: 201 }).status(201);
  } catch (e) {
    res.send({ message: "Not Registered", status: 400 }).status(400);
  }
});

route.get("/url/:id", async (req, res) => {
  try {
    //console.log(req.params.id);
    const result = await File.findById(req.params.id);
    //console.log(result);
    res.send({ result: result.file });
  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
