package com.test1;


import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;

public class ImgDownload {

    public static void main(String[] args) {
   	 System.setProperty("https.proxyHost", "10.145.22.10");
 		System.setProperty("https.proxyPort", "8080");
 		System.setProperty("http.proxyHost", "10.145.22.10");
 		System.setProperty("http.proxyPort", "8080");
        String url = "https://d3fgmcoixbear.cloudfront.net/s3fs-public/colors/308581-GM-Brownstone.JPG";
        
        try {
            downloadUsingNIO(url, "d:/308581-GM-Brownstone.JPG");
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void downloadUsingNIO(String urlStr, String file) throws IOException {
        URL url = new URL(urlStr);
        ReadableByteChannel rbc = Channels.newChannel(url.openStream());
        FileOutputStream fos = new FileOutputStream(file);
        fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
        fos.close();
        rbc.close();
    }

}
