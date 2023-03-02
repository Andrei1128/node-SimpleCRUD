const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
const PORT = 3000;

let produse = [
  {
    id: "1",
    nume: "banana",
    cantitate: 5,
  },
  {
    id: "2",
    nume: "portocale",
    cantitate: 3,
  },
  {
    id: "3",
    nume: "mere",
    cantitate: 10,
  },
];

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

app.get("/produse", (req, res) => {
  res.render("produs/index.ejs", { produse });
});

app.get("/produse/:id", (req, res) => {
  const produs = produse.find((produs) => produs.id === req.params.id);
  res.render("produs/produs.ejs", { produs });
});

app.delete("/produse/:id", (req, res) => {
  produse = produse.filter((produse) => produse.id !== req.params.id);
  res.redirect("/produse");
});

app.put("/produse/:id", (req, res) => {
  var produs = produse.find((produs) => produs.id === req.params.id);
  produs.nume = req.body.nume;
  produs.cantitate = req.body.cantitate;
  res.redirect("/produse");
});

app.post("/produse", (req, res) => {
  produse = [
    ...produse,
    {
      ...req.body,
      id: uuidv4(),
    },
  ];
  res.redirect("/produse");
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
