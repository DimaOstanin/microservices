import KafkaConfig from "../config/KafkaConfig.js";
import Container from "../model/container.model.js";

const sendMessageToKafka = async () => {
  try {
    const message = await checkWareHouse(); 
    console.log("objects", message);

    const kafkaConfig = new KafkaConfig();
    const messages = [{ key: "key1", value: message.toString() }];
    kafkaConfig.produce("Lack-Detected", messages);

  } catch (error) {
    console.log(error);
  }
};

const checkWareHouse = async () => {
  try {
    const containers = await getContainersFromDatabase();
    function meetsCriteria(item) {
      return item.quantity < item.maxCapacity * 0.5;
    }
    const filteredContainers = containers.filter(meetsCriteria);
    console.log("Filtered objects", filteredContainers.length);
    return filteredContainers; 
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
};

const getContainersFromDatabase = async () => {
  try {
    const containers = await Container.find({});
    console.log("List of containers", containers);
    return containers; 
  } catch (error) {
    console.log("Error fetching containers:", error);
    throw error; 
  }
};

const controllers = { sendMessageToKafka };

export default controllers;
