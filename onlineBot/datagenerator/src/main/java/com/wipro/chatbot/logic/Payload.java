package com.wipro.chatbot.logic;

import java.io.Serializable;
import java.util.Date;

public class Payload implements Serializable {

	private Long sequence;
	private String from;
	private String to;
	private Date timestamp;
	private String message;

	public Payload(Long sequence, String from, String to, Date timestamp, String message) {
		this.sequence = sequence;
		this.from = from;
		this.to = to;
		this.timestamp = timestamp;
		this.message = message;
	}

	public Long getSequence() {
		return sequence;
	}

	public void setSequence(Long sequence) {
		this.sequence = sequence;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return this.sequence + ", " + this.from + ", " + this.to + ", " + this.timestamp + ", " + this.message;
	}
}