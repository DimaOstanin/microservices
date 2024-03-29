
import { express } from 'express';
const kafka = require('kafka-node');

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

const Producer = kafka.Producer;
const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(kafkaClient);
app.post('/sensors', (req, res) => {
  console.log("post on")
  const { spotId, quantity, unit } = req.body;
  if (quantity < 50) { 
    producer.send([{ topic: 'lack-detector', messages: JSON.stringify({ spotId, unit,quantity }) }], (err, data) => {
      if(err){
          console.log("error" + err)
      }
      console.log('Lack detected and sent to Kafka:', data);
    });
  }
  res.status(200).send('post was sending');
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/',(req,res)=>{
    res.send("work")
})





