const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Todo API!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
