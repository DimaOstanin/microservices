
const express = require('express');
const kafka = require('kafka-node');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');



const app = express();
app.use(bodyParser.json());

const Producer = kafka.Producer;
const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(kafkaClient);


app.post('/detect-full', (req, res) => {
    const { spotId, quantity, unit, orderId } = req.body;
    if (quantity > 50 && orderId) { // 50% threshold and order exists
      producer.send([{ topic: 'full-detector', messages: JSON.stringify({ spotId, orderId }) }], (err, data) => {
        console.log('Full detected and sent to Kafka:', data);
      });
    }
    res.status(200).send('Full detection processed');
  });





const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});