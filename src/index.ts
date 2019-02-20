import express from "express";

const PORT = process.env.PORT || 5000;

const app = express();

// define a route handler for the default home page
app.get("/hello", (req, res) => {
  res.send("Hello world!");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
