import { Message } from 'kafkajs';
import KafkaConfig from '../config/KafkaConfig';
import AnalyzerService from '../service/AnalyzerService';

class AnalyzerController {
  private kafkaConfig: KafkaConfig;
  private analyzerService: AnalyzerService;

  constructor(kafkaConfig: KafkaConfig, analyzerService: AnalyzerService) {
    this.kafkaConfig = kafkaConfig;
    this.analyzerService = analyzerService;
  }

  public async handleMessage(topic: string, message: Message) {
    try {
      if (message.value !== null && message.value !== undefined) { 
        const containerData = JSON.parse(message.value.toString());
        const threshold = await this.getThresholdFromDB(containerData.name);
  
        await this.analyzerService.analyzeAndGenerateMessages(containerData, threshold, 'thresholed-detection');
      } else {
        throw new Error("Message value is null or undefined");
      }
    } catch (error) {
      console.error(error);
    }
  }

  private async getThresholdFromDB(name: string): Promise<number> {
    // Implement method to fetch threshold from DB
    return 50; // Example value
  }
}

export default AnalyzerController;
