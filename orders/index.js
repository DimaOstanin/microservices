
const express = require('express');
const kafka = require('kafka-node');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');



const app = express();
app.use(bodyParser.json());


const dbClient = new MongoClient('mongodb://localhost:27017');

const Producer = kafka.Producer;
const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(kafkaClient);



app.post('/create-order', (req, res) => {
    const { spotId, productName, requiredQuantity } = req.body;
    const orderRecord = {
      orderId: `ORD-${new Date().getTime()}`,
      spotId,
      productName,
      requiredQuantity
    };
    producer.send([{ topic: 'order-record', messages: JSON.stringify(orderRecord) }], (err, data) => {
      console.log('Order record sent to Kafka:', data);
    });
    res.status(200).send('Order record created');
  });

  
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});