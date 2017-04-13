package com.wipro.chatbot.kafka;

import java.io.IOException;
import com.wipro.chatbot.util.ReadConfig;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.streaming.Duration;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaPairInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.kafka.KafkaUtils;
import org.codehaus.jackson.map.ObjectMapper;

import kafka.serializer.StringDecoder;
import scala.Tuple2;

public class DataGen {

	private static String sourceTopic = "lrTopic22";
	private static String sinkTopic = "lrTopic24";
	static Map map =(Map)ReadConfig.getConfig().get("kafka");
	private static String brokers = (String) map.get("brokers");
	private static String zkQuoram =(String) map.get("zkQuoram") ;

	public static void main(String[] args) {
		KafkaProducer kp = KafkaProducer.getInstance(sinkTopic);
		SparkConf sparkConf = new SparkConf().setAppName("DataGen").setMaster("local[2]");
		JavaStreamingContext jssc = new JavaStreamingContext(sparkConf, new Duration(10000));
		JavaPairInputDStream<String, String> messages = KafkaUtils.createDirectStream(jssc, String.class, String.class,
				StringDecoder.class, StringDecoder.class, getKafkaParams(), getTopicSet(sourceTopic));

		JavaDStream<String> records = messages.map(Tuple2::_2);

		records.map(new Function<String, List<Double>>() {
			private static final long serialVersionUID = 272415769961008316L;

			@Override
			public List<Double> call(String record) throws Exception {
				return Arrays.stream(record.split(",")).map((x) -> Double.parseDouble(x)).collect(Collectors.toList());
			}
		}).foreachRDD(x -> {
			x.map(y -> {
				String message = toJsonString(y);
				kp.execute(kp.getProducer(), message);
				return message;
			}).count();
		});
		jssc.start();
		jssc.awaitTermination();
	}

	private static Map<String, String> getKafkaParams() {
		Map<String, String> kafkaParams = new HashMap<>();
		kafkaParams.put("metadata.broker.list", brokers);
		kafkaParams.put("zookeeper.connect", zkQuoram);
		kafkaParams.put("group.id", UUID.randomUUID().toString());
		kafkaParams.put("zookeeper.connection.timeout.ms", "10000");
		kafkaParams.put("auto.offset.reset", "smallest");
		kafkaParams.put("enable.auto.commit", "false");
		return kafkaParams;
	}

	private static Set<String> getTopicSet(String topic) {
		Set<String> topicSet = new HashSet<String>();
		topicSet.add(topic);
		return topicSet;
	}

	public static String toJsonString(List<Double> features) {
		Map<String, Double> featureMap = new HashMap<>();
		int i = 0;
		for (Double feature : features) {
			featureMap.put("f" + i++, feature);
		}
		String json = "{}";
		try {
			json = new ObjectMapper().writeValueAsString(featureMap);
		} catch (IOException e) {
		}
		return json;
	}
}
