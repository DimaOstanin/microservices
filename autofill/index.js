
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



class AutoFill {
  constructor() {
    this.consumer = null;
    this.kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
    this.consumer = new kafka.Consumer(this.kafkaClient, [{ topic: 'lack-detector' }]);
    this.init();
  }

  init() {
    this.consumer.on('message', async (message) => {
      try {
        const data = JSON.parse(message.value);
        console.log(data)
        // await this.createOrder(data);
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    this.consumer.on('error', (error) => {
      console.error('Error occurred with Kafka consumer:', error);
    });
  }

  async createOrder(data) {
    // В этом методе должна быть логика создания заказа на основе данных, полученных из Kafka
    console.log('Received message from Kafka:', data);
    // Здесь примерно должен быть код, который создает заказ на основе данных
    // Пример:
    // const order = await Order.create({ spotId: data.spotId, quantity: data.quantity, unit: data.unit });
    // console.log('Created order:', order);
  }
}

// Создаем экземпляр AutoFill
new AutoFill();


    


const PORT =  3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

