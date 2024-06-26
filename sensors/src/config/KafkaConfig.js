import { Kafka, Partitioners } from "kafkajs";


class KafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "sensors",
      brokers: ['kafka1:29092', 'kafka2:29093'],
    });
    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner
    });
  }

  async produce(topic, messages) {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic: topic,
        messages: messages,
      });
    } catch (error) {
      console.error(error);
    } finally {
      await this.producer.disconnect();
    }
  }

}

export default KafkaConfig;