import KafkaConfig from "../config/KafkaConfig.js";
import Container from "../model/container.model.js";

const sendMessageToKafka = async () => {
  try {
    const containerData = await checkWareHouse(); 
    const message = containerData.map(container => JSON.stringify(container));
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
      function calculateFillPercentage(item) {
          const fillPercentage = (item.quantity / item.maxCapacity) * 100;
          return { name: item.name, fillPercentage: Math.round(fillPercentage) };
      }
      const containersWithFillPercentage = containers.map(calculateFillPercentage);
      console.log("Containers with fill percentage", containersWithFillPercentage);
      return containersWithFillPercentage;
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
