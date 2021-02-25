import mongoose from "mongoose";
import config from "../config/config";
import app from "./express";

// Connection URL
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(process.env.MONGODB_URI);
  console.info("Server started on port %s.", config.port);
});
