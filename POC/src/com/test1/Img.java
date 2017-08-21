package com.test1;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.net.URL;
import java.util.Date;

/**
 * @author BA354098
 *
 */


public class Img
{
	
	
	
	/**
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception
	{
		System.setProperty("https.proxyHost", "10.145.22.10");
		System.setProperty("https.proxyPort", "8080");
		System.setProperty("http.proxyHost", "10.145.22.10");
		System.setProperty("http.proxyPort", "8080");
//		System.setProperty("ftp.proxyHost", "10.145.22.10");
//		System.setProperty("ftp.proxyPort", "8080");
//		System.setProperty("tcp.proxyHost", "10.145.22.10");
//		System.setProperty("tcp.proxyPort", "8080");
		
		String imageUrl = "https://images.alphacoders.com/661/661647.png";
		
		saveImage(imageUrl);
		
	}
	
	/**
	 * @param imageUrl
	 * @param destinationFile
	 * @throws IOException
	 */
	public static void saveImage(String imageUrl) throws IOException {	
		
		
		URL url = new URL(imageUrl);
		String outParts[]=imageUrl.split("/");
		InputStream is = url.openStream();
		String dateSaved=new Date().toString().replaceAll(":", "-");
		OutputStream os = new FileOutputStream("d:/"+(outParts[outParts.length-1].length()<=20?outParts[outParts.length-1].toLowerCase():"image - "+dateSaved+".jpg"));

		byte[] b = new byte[2048];
		int length;

		while ((length = is.read(b)) != -1) {
			os.write(b, 0, length);
		}

		is.close();
		os.close();
	}

}
