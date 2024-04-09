import { MongoClient } from 'mongodb';
import KafkaConfig from '../config/KafkaConfig';
import Container from '../models/container.model';

interface ContainerData {
  name: string;
  fillPercentage: number;
}

class AnalyzerService {
  private mongoClient: MongoClient;
  private kafkaConfig: KafkaConfig;

  constructor(mongoClient: MongoClient, kafkaConfig: KafkaConfig) {
    this.mongoClient = mongoClient;
    this.kafkaConfig = kafkaConfig;
  }

  public async analyzeAndGenerateMessages(containerData: ContainerData, threshold: number, topic: string) {
    try {
      
      const existingData = await Container.findOne({ name: containerData.name });

      if (!existingData || containerData.fillPercentage < existingData.threshold) {
       
        const message = {
          name: containerData.name,
          fillPercentage: containerData.fillPercentage
        };

        await this.kafkaConfig.produce(topic, [message]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      await this.mongoClient.close();
    }
  }
}

export default AnalyzerService;
