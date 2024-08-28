const app = require("./app");

app.get("/", (req, res) => {
  res.send("done");
});

app.listen(3000, () => {
  console.log("server Started");
});
