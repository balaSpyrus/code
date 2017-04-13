package com.wipro.chatbot.logic;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

public class ConverstaionToRecord {

	public static List<Payload> convert(String input, String separator1, String separator2) {
		List<Payload> payloads = new ArrayList<Payload>();
		String lines[] = input.split(separator1);
		long counter = 0L;
		for (String line : lines) {
			String data[] = line.split(separator2);
			Payload payload = new Payload(counter, data[1], data[2], getTime(data[0]), data[3]);
			payloads.add(payload);
			counter++;
		}
		return payloads;
	}

	private static Date getTime(String string) {
		DateTimeFormatter formatter = DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		DateTime dt = formatter.parseDateTime(string);
		return new Date(dt.getMillis());
	}
}
