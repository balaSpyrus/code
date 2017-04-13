package com.wipro.chatbot.kafka;

import java.util.HashMap;
import java.util.Map;
import com.wipro.chatbot.util.ReadConfig;
import java.util.Map;
import java.util.Properties;

import com.wipro.chatbot.kafka.gen.BaseProcessor;

import kafka.javaapi.producer.Producer;
import kafka.producer.KeyedMessage;
import kafka.producer.ProducerConfig;

public class KafkaProducer extends BaseProcessor {

	private static final long serialVersionUID = -9053519078378703277L;

	private static Producer<String, String> producer;

	private String topic;
	static Map map =(Map)ReadConfig.getConfig().get("kafkaproducer");
	private static String metaBrokerList = (String) map.get("metaBrokerList");

	@Override
	protected void init(Map<String, String> conf) {
		Properties props = new Properties();
		props.put("metadata.broker.list",metaBrokerList);
		props.put("serializer.class", "kafka.serializer.StringEncoder");
		props.put("partitioner.class", "com.wipro.chatbot.kafka.SimplePartitioner");
		props.put("request.required.acks", "1");

		topic = conf.get("topic");

		ProducerConfig config = new ProducerConfig(props);

		producer = new Producer<String, String>(config);
	}

	private KafkaProducer(Map<String, String> conf) {
		init(conf);
	}

	@Override
	public void execute(Object producer, Object data) {
		castToProducer(producer).send(new KeyedMessage<String, String>(topic, castToString(data)));
	}

	private String castToString(Object obj) {
		String message = null;
		try {
			if (obj instanceof String) {
				message = (String) obj;
			}
		} catch (Exception e) {
			System.out.println(e);
		}
		return message;
	}

	private Producer<String, String> castToProducer(Object obj) {
		Producer<String, String> producer = null;
		try {
			if (obj instanceof Producer) {
				producer = (Producer) obj;
			}
		} catch (Exception e) {
			System.out.println(e);
		}
		return producer;
	}

	public Producer<String, String> getProducer() {
		return producer;
	}

	public static KafkaProducer getInstance(String topic) {
		Map<String, String> kafkaConf = new HashMap<>();
		kafkaConf.put("topic", topic);
		KafkaProducer kp = new KafkaProducer(kafkaConf);
		return kp;
	}

	@Override
	public void destroy() {
		producer.close();
	}
}
