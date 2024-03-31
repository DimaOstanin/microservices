
import express from 'express';
import dotenv from 'dotenv';
import KafkaConfig from "./config/KafkaConfig.js";

dotenv.config();

const app = express();
app.use(express.json());


const kafkaConfig = new KafkaConfig();
kafkaConfig.consume("Lack-Detected", (value) => {
  console.log("Containers with threshold less 50%", value);
});


    
app.listen(process.env.PORT, () => {
  console.log(`AutoFill is running on port ${process.env.PORT}`);
});

