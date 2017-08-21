package com.proto;

import java.io.File;
import org.apache.tika.Tika;
/**
 * @author BA354098
 *
 */
public class ReadPDF
{

	/**
	 * @param args
	 * @throws Exception 
	 */
	
	public static void main(String[] args) throws Exception
	{
		


	    File folder=new File("d:\\CT_Reports");
	    File[] listOfFiles = folder.listFiles();

	    for (File file:listOfFiles) {
	   	 
	      if (file.isFile()) {
	       
	      	System.err.println("Reading the File " + file.getName());	      	
		      Tika tika = new Tika();
		      String filecontent = tika.parseToString(file);
		      System.out.println("Extracted Content: " + filecontent);
		      
	      } 
	    
	    }

	}

}
