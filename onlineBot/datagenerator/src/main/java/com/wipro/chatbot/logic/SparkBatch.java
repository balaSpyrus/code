package com.wipro.chatbot.logic;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.PairFunction;
import org.apache.spark.api.java.function.VoidFunction;
import org.apache.spark.mllib.regression.StreamingLinearRegressionWithSGD;

import com.wipro.chatbot.kafka.KafkaProducer;
import com.wipro.chatbot.util.UUIDGen;

import scala.Tuple2;

public class SparkBatch {

	public static void main(String[] args) {
		Logger.getLogger("org").setLevel(Level.OFF);
		Logger.getLogger("akka").setLevel(Level.OFF);

		SparkConf sparkConf = new SparkConf().setAppName("JavaConverstaionToRecord").setMaster("local[2]");

		// Create the context with 2 seconds batch size
		JavaSparkContext jsc = new JavaSparkContext(sparkConf);

		JavaPairRDD<String, String> lines = jsc.wholeTextFiles("/home/am372811/data/dataset/52");

		JavaPairRDD<UUID, List<Payload>> jprdd = lines
				.mapToPair(new PairFunction<Tuple2<String, String>, UUID, List<Payload>>() {

					private static final long serialVersionUID = -6916418815018792143L;

					@Override
					public Tuple2<UUID, List<Payload>> call(Tuple2<String, String> tuple) throws Exception {
						return new Tuple2<UUID, List<Payload>>(UUIDGen.getUniqueId(),
								ConverstaionToRecord.convert(tuple._2, "\n", "\t"));
					}
				});
		jprdd.foreach(new VoidFunction<Tuple2<UUID, List<Payload>>>() {

			private static final long serialVersionUID = -354219098798682399L;

			KafkaProducer kp = KafkaProducer.getInstance("mytesttopic1");
			
			@Override
			public void call(Tuple2<UUID, List<Payload>> tuple) throws Exception {
				System.out.println(" Conversation ID : " + tuple._1.toString());
				
				for (Payload payload : tuple._2) {
					System.out.println(payload.toString());
					kp.execute(kp.getProducer(), payload.toString());
					// TODO : Dump to Hive
				}
			}
		});
	}
}