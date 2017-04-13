package com.wipro.chatbot.hive;

import java.util.Map;
import com.wipro.chatbot.util.ReadConfig;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.hive.HiveContext;

import com.wipro.chatbot.util.ReadConfig;

public class HiveDemo2 {
	static Map map =(Map)ReadConfig.getConfig().get("hive");
	private static String metaStore = (String) map.get("metaStore");
	public static void main(String[] args) {
		System.setProperty("hive.metastore.uris",metaStore);
		SparkConf sparkConf = new SparkConf().setAppName("JavaConverstaionToRecord").setMaster("local[2]")
				.set("spark.sql.hive.thriftServer.singleSession", "true");
		JavaSparkContext jsc = new JavaSparkContext(sparkConf);
		jsc.addFile("/usr/local/hadoop-2.6.5/etc/hadoop/core-site.xml");
		jsc.addFile("/usr/local/hadoop-2.6.5/etc/hadoop/hdfs-site.xml");
		jsc.addFile("/usr/local/apache-hive-2.0.1-bin/conf/hive-site.xml");

		HiveContext sqlContext = new HiveContext(jsc);
		sqlContext.setConf("hive.metastore.warehouse.dir", "hdfs://am372811-PC:8020/user/hive/warehouse");
		sqlContext.sql("USE default");
		sqlContext.sql("CREATE TABLE IF NOT EXISTS house_prices (key INT, value STRING)");
		sqlContext.sql(
				"LOAD DATA LOCAL INPATH '/home/am372811/Downloads/spark-master/examples/src/main/resources/kv1.txt' INTO TABLE src");
		Row[] results = sqlContext.sql("FROM src SELECT key, value").collect();
		for (Row r : results) {
			System.out.println(r);
		}
	}
}
