
import  express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import constrollers from './controller/controller.js';

dotenv.config();

const app = express();
app.use(express.json());



mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

setTimeout(constrollers.sendMessageToKafka,500)
// constrollers.sendMessageToKafka



app.listen(process.env.PORT, () => {
  console.log(`Sensors is running on port ${process.env.PORT}`);
});

app.get('/',(req,res)=>{
    res.send("work")
})





