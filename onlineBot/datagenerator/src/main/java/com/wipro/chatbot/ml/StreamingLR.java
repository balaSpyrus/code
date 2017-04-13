package com.wipro.chatbot.ml;
import java.util.Map;
import com.wipro.chatbot.util.ReadConfig;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.StringJoiner;
import java.util.UUID;

import org.apache.spark.SparkConf;
import org.apache.spark.mllib.linalg.Vector;
import org.apache.spark.mllib.linalg.Vectors;
import org.apache.spark.mllib.regression.LabeledPoint;
import org.apache.spark.mllib.regression.StreamingLinearRegressionWithSGD;
import org.apache.spark.streaming.Duration;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaPairDStream;
import org.apache.spark.streaming.api.java.JavaPairInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.kafka.KafkaUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import com.wipro.chatbot.kafka.KafkaProducer;
import com.wipro.chatbot.util.ReadConfig;

import kafka.serializer.StringDecoder;
import scala.Tuple2;

public class StreamingLR {

	private static final int NUM_FEATURES = 10;
	private static String trainSource = "lrTopic24";
	private static String predictSource = "lrTopic25";
	private static String predictSink = "lrTopic26";
	static Map map =(Map)ReadConfig.getConfig().get("kafka");
	private static String brokers = (String) map.get("brokers");
	private static String zkQuoram =(String) map.get("zkQuoram") ;

	public static void main(String[] args) {
		KafkaProducer kp = KafkaProducer.getInstance(predictSink);

		SparkConf sparkConf = new SparkConf().setAppName("JavaStreamingLR").setMaster("local[2]");
		// Create the context with 10 seconds batch size
		JavaStreamingContext jssc = new JavaStreamingContext(sparkConf, new Duration(10000));

		StreamingLinearRegressionWithSGD slrModel = new StreamingLinearRegressionWithSGD()
				.setInitialWeights(getInitWeightVect());
		JavaPairInputDStream<String, String> trainMessages = KafkaUtils.createDirectStream(jssc, String.class,
				String.class, StringDecoder.class, StringDecoder.class, getKafkaParams(), getTopicSet(trainSource));
		JavaPairInputDStream<String, String> predictMessages = KafkaUtils.createDirectStream(jssc, String.class,
				String.class, StringDecoder.class, StringDecoder.class, getKafkaParams(), getTopicSet(predictSource));

		JavaDStream<LabeledPoint> trainData = trainMessages.map(Tuple2::_2).map(x -> {
			Vector v = getFeatureVector(x);
			return new LabeledPoint(getLabel(x), v);
		});
		JavaPairDStream<Vector, Vector> predictData = predictMessages.map(Tuple2::_2).mapToPair(x -> {
			Vector v = getFeatureVector(x);
			return new Tuple2<Vector, Vector>(v, v);
		});
		slrModel.trainOn(trainData);
		slrModel.predictOnValues(predictData).foreachRDD(x -> {
			x.foreach(y -> {
				StringJoiner sj = new StringJoiner(",");
				for (double d : y._1.toArray()) {
					sj.add(d + "");
				}
				String message = sj.toString() + ":" + y._2;
				kp.execute(kp.getProducer(), message);
			});
		});
		jssc.start();
		jssc.awaitTermination();
	}

	private static Vector getFeatureVector(String message) {
		Map<String, Double> map = new HashMap<String, Double>();
		try {
			map = new ObjectMapper().readValue(message, new TypeReference<Map<String, Double>>() {
			});
		} catch (IOException e) {
		}
		double[] vector = new double[NUM_FEATURES];
		for (int i = 0; i < NUM_FEATURES; i++) {
			vector[i] = map.get("f" + i);
		}
		return Vectors.dense(vector);
	}

	private static double getLabel(String message) {
		Map<String, Double> map = new HashMap<String, Double>();
		try {
			map = new ObjectMapper().readValue(message, new TypeReference<Map<String, Double>>() {
			});
		} catch (IOException e) {
		}
		return map.get("f" + NUM_FEATURES);
	}

	private static Vector getInitWeightVect() {
		return Vectors.dense(new double[NUM_FEATURES]);
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
}
