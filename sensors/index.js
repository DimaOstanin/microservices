
const express = require('express');
const kafka = require('kafka-node');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');



const app = express();
app.use(bodyParser.json());

const Producer = kafka.Producer;
const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(kafkaClient);



app.post('/detect-lack', (req, res) => {
    const { spotId, quantity, unit } = req.body;
    if (quantity < 50) { // 50% threshold
      producer.send([{ topic: 'lack-detector', messages: JSON.stringify({ spotId, unit }) }], (err, data) => {
        console.log('Lack detected and sent to Kafka:', data);
      });
    }
    res.status(200).send('Lack detection processed');
  });


  const PORT =  3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});