import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  console.log("load from .env ...");
  dotenv.load();
}

const PORT = process.env.PORT || 80;

import app from "./app";
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
