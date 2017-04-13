package com.wipro.chatbot.kafka;

import java.util.Arrays;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.VoidFunction;
import org.apache.spark.streaming.Duration;
import org.apache.spark.streaming.api.java.JavaStreamingContext;

public class SparkRunner {

	public static void main(String[] args) {

		KafkaProducer kp = KafkaProducer.getInstance("mytesttopic");

		SparkConf sparkConf = new SparkConf().setAppName("JavaKafkaTopicWrite").setMaster("local[2]");

		JavaSparkContext sc = new JavaSparkContext(sparkConf);

		JavaStreamingContext jssc = new JavaStreamingContext(sc, new Duration(2000));

		JavaRDD<String> inputRdd = sc.parallelize(Arrays.asList("a,b,c1".split(",")));

		inputRdd.foreach(new VoidFunction<String>() {
			private static final long serialVersionUID = -5520927484494268233L;

			@Override
			public void call(String message) throws Exception {
				kp.execute(kp.getProducer(), message);
			}
		});
		// jssc.start();
		// jssc.awaitTermination();
	}
}
