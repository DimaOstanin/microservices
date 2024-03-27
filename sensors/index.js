
const express = require('express');
const kafka = require('kafka-node');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');



const app = express();
app.use(bodyParser.json());

const Producer = kafka.Producer;
const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(kafkaClient);