import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { CONNECTION_URL } from "./mongooseUrl.js";
import postRoutes from "./Routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// const CONNECTION_URL =
//   "mongodb+srv://<username>:<password>@<clustername>.fbb80.mongodb.net/<databasename>?retryWrites=true&w=majority";

const PORT = 5001;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, "localhost", () =>
      console.log("Listening on port: " + PORT)
    );
  })
  .catch((err) => console.log(err));

app.use("/posts", postRoutes);
