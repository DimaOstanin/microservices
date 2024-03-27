
const express = require('express');
const kafka = require('kafka-node');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');



const app = express();
app.use(bodyParser.json());


const dbClient = new MongoClient('mongodb://localhost:27017');

const Producer = kafka.Producer;
const Consumer = kafka.Consumer;
const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(kafkaClient);





    const containerData = {
      spotId: 'A1',
      quantity: Math.floor(Math.random() * 100),
      unit: 'boxes'
    };
    producer.send([{ topic: 'container-data', messages: JSON.stringify(containerData) }], (err, data) => {
      console.log('Data sent to Kafka:', data);
    });
 


const PORT =  3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

