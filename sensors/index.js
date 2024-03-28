
const express = require('express');
const kafka = require('kafka-node');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

const PORT =  3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



const Producer = kafka.Producer;
const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(kafkaClient);


app.get('/',(req,res)=>{
    res.send("work")
})



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


