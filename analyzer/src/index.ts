import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Kafka } from "kafkajs";
import KafkaConfig from "./config/KafkaConfig";
import AnalyzerService from "./service/AnalyzerService";
import AnalyzerController from "./controller/AnalyzerController";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

// mongoose
//   .connect(process.env.MONGO_URL || 'mongodb://localhost:27017')
//   .then(() => {
//     console.log("Connected to MongoDB!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });


// const analyzerService = new AnalyzerService(mongoClient, kafkaConfig);
// const analyzerController = new AnalyzerController(kafkaConfig, analyzerService);





function getMessages() {
  const kafkaConfig = new KafkaConfig();
  kafkaConfig.consume("Lack-Detected", (value) => {
    console.log("Containers status ->", value);
  });
}

getMessages();



app.listen(process.env.PORT, () => {
  console.log(`Analyzer running at http://localhost:${process.env.PORT}`);
});
