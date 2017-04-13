package com.wipro.chatbot.util;

import java.util.Date;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import com.eaio.uuid.UUIDGen;

public final class TimestampToUUIDConverter {
	/**
	 * Map between timestamps in millis and UUID time value counters.
	 */
	private final ConcurrentHashMap<Long, Long> lastTimestamps = new ConcurrentHashMap<>();

	public final UUID convert(final Date timestamp) {
		final long mostSignificatBits = createTime(timestamp.getTime());
		final long leastSignificatBits = UUIDGen.getClockSeqAndNode();
		return new UUID(mostSignificatBits, leastSignificatBits);
	}

	private long createTime(final long millis) {
		long time;

		// UTC time in Gregorian calendar (UUID format).
		long timeMillis = (millis * 10000) + 0x01B21DD213814000L;

		lastTimestamps.putIfAbsent(millis, 0L);

		// Concurrently increment the counter.
		Long r;
		do {
			r = lastTimestamps.get(millis);
		} while (!lastTimestamps.replace(millis, r, r + 1));

		timeMillis += r;

		// UUID format byte magic:
		// Time low.
		time = timeMillis << 32;
		// Time mid.
		time |= (timeMillis & 0xFFFF00000000L) >> 16;
		// Time high and version.
		time |= 0x1000 | ((timeMillis >> 48) & 0x0FFF); // version 1

		return time;
	}
}
