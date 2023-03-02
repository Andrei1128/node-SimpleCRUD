require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL).catch((error) => console.log(error));
const ProdusSchema = new mongoose.Schema({
  nume: { type: String, required: true },
  cantitate: { type: Number, required: true },
});
const produs = mongoose.model("produs", ProdusSchema);

app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/produse");
});

app.get("/produse", async (req, res) => {
  const produse = await produs.find({});
  res.render("produs/index.ejs", { produse });
});

app.get("/produse/:id", async (req, res) => {
  const produsGasit = await produs.findById(req.params.id);
  res.render("produs/produs.ejs", { produs: produsGasit });
});

app.delete("/produse/:id", async (req, res) => {
  await produs.findByIdAndDelete(req.params.id);
  res.redirect("/produse");
});

app.put("/produse/:id", async (req, res) => {
  await produs.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/produse");
});

app.post("/produse", async (req, res) => {
  const produsNou = new produs(req.body);
  await produsNou.save();
  res.redirect("/produse");
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
