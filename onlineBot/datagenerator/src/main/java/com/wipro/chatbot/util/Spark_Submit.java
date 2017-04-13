package com.wipro.chatbot.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Spark_Submit {
	public static void main(String[] args1) throws IOException, InterruptedException {
		String jar = "/home/dh354099/workspace/sample/target/sample-0.0.1-SNAPSHOT.jar";
		String master = "spark://localhost:7077";
		String className = "sample.sample.JavaWordCount";
		String mode="client";
		List<String> args = new ArrayList<>();
		args.add("/usr/local/spark/bin/spark-submit");
		args.add("--class");
		args.add(className);
		args.add("--master");
		args.add(master);
		args.add("--deploy-mode");
		args.add(mode);
		args.add(jar);
		args.add("/home/dh354099/Desktop/check.txt");
		String[] command = args.toArray(new String[args.size()]);
		
		ProcessBuilder processBuilder = new ProcessBuilder(command);
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        StringBuilder processOutput = new StringBuilder();

        try (BufferedReader processOutputReader = new BufferedReader(
                new InputStreamReader(process.getInputStream()));)
        {
            String readLine;

            while ((readLine = processOutputReader.readLine()) != null)
            {
                processOutput.append(readLine + System.lineSeparator());
            }

            process.waitFor();
       

        System.out.println(processOutput.toString().trim());
		}
	}
}
