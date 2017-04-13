package com.wipro.chatbot.util.dataset;

import java.util.StringJoiner;

import com.wipro.chatbot.kafka.KafkaProducer;

public class LinearRegressionDatasetGen {

	private final static int NUM_FEATURES = 10;
	private final static int NUM_DATA = 1;
	private final static int RATE_CONTROLLER = 5;
	private final static String topic = "lrTopic22";

	private static double[] WEIGHTS = new double[NUM_FEATURES];
	static {
		for (int i = 0; i < NUM_FEATURES; i++) {
			WEIGHTS[i] = (double) (Math.random() % 10);
		}
	}

	public static void main(String[] args) {
		KafkaProducer kp = KafkaProducer.getInstance(topic);
		for (int i = 0; i < NUM_FEATURES; i++) {
			System.out.print(WEIGHTS[i] + ",");
		}
		double x[] = new double[NUM_FEATURES];

		double train_dataset[][] = new double[NUM_DATA][NUM_FEATURES + 1];

		System.out.println("Publishing data to kafka topic : " + topic + "...");
		for (int n = 0, i; n < NUM_DATA; n++) {
			train_dataset[n] = new double[NUM_FEATURES + 1];
			for (i = 0; i < NUM_FEATURES; i++) {
				double temp = (double) (Math.random() % 100);
				x[i] = temp;
				train_dataset[n][i] = temp;
			}
			train_dataset[n][i] = multiplyAndAdd(WEIGHTS, x);
			StringJoiner dataToPublish = new StringJoiner(",");
			for (int j = 0; j <= NUM_FEATURES; j++) {
				dataToPublish.add(train_dataset[n][j] + "");
			}
			kp.execute(kp.getProducer(), dataToPublish.toString());

			if (n % 1000 == 0) {
				System.out.println((n * 100.0) / NUM_DATA + "%");
				sleep(RATE_CONTROLLER);
			}

		}
		System.out.println("100%\ndone..");
	}

	private static void sleep(long ms) {
		try {
			Thread.sleep(ms);
		} catch (InterruptedException e) {
		}
	}

	private static double multiplyAndAdd(double[] weights, double[] x) {
		double y = 0;
		for (int i = 0; i < NUM_FEATURES; i++) {
			y += weights[i] * x[i];
		}
		return y;
	}
}
