import KafkaConfig from "../config/KafkaConfig.js";
import Container from "../models/container.model.js";



const sendMessageToKafka = async () => {
  try {
    const { message } = checkWareHouse();
    // const kafkaConfig = new KafkaConfig();
    // const messages = [{ key: "key1", value: message }];
    // kafkaConfig.produce("Lack-Detected", messages);

  } catch (error) {
    console.log(error);
  }
};

const checkWareHouse = async () => {
    const containers = getAllcontainers();

    return containers;
};
 const getAllcontainers = async () => {
    try {
      var containers = await Container.find({});
        console.log("List of container "+ containers);
    } catch (error) {
      console.log("Error fetching containers");
    }
    return containers;
  };


const constrollers = { sendMessageToKafka };

export default constrollers;