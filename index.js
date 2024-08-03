import express from "express";
import pg from "pg";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "oceanea",
  password: "2Punit&ive",
  port: 5433,
});

db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  let query = await db.query("SELECT * FROM book");
  const details = query.rows.map((item) => item);

  res.render("index.ejs", { result: details, title: "Oceanea Book Review" });
});

app.get("/add", (req, res) => {
  res.render("create.ejs");
});

app.post("/create", (req, res) => {
  const updateValue = req.body.title;
  const updateValue1 = req.body.photourl;
  const updateValue2 = req.body.reviewcontent;
  const updateValue3 = req.body.author;
  const updateValue4 = req.body.rating;

  db.query(
    "INSERT INTO book (title, photourl, reviewcontent, author, rating) VALUES ($1, $2, $3, $4, $5)",
    [updateValue, updateValue1, updateValue2, updateValue3, updateValue4]
  );

  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  var editValue = req.body.edit;
  const detailID = await db.query("SELECT * FROM book WHERE id=$1", [
    editValue,
  ]);
  console.log(detailID.rows);
  res.render("edit.ejs", { detail: detailID.rows[0] });
});

app.post("/update", async (req, res) => {
  const updateValue = req.body.title;
  const updateValue1 = req.body.photourl;
  const updateValue2 = req.body.reviewcontent;
  const updateValue3 = req.body.author;
  const updateValue4 = req.body.rating;
  const updateValue5 = req.body.id;

  db.query(
    "UPDATE book SET title = $1, photourl = $2, reviewcontent = $3, author = $4, rating = $5 WHERE id = $6",
    [
      updateValue,
      updateValue1,
      updateValue2,
      updateValue3,
      updateValue4,
      updateValue5,
    ]
  );
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  var deleteId = req.body.delete;
  console.log(deleteId);
  db.query("DELETE from book WHERE id = $1", [deleteId]);
  res.redirect("/");
});

app.listen(port, (req, res) => {
  console.log(`Server is running from port ${port}`);
});
