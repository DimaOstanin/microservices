import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import SensorController from "./controller/SensorController.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

// setTimeout(SensorController.sendMessageToKafka, 500);
setInterval(SensorController.sendMessageToKafka,5000)

app.listen(process.env.PORT, () => {
  console.log(`Sensors is running on port ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("work");
});
