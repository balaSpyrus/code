package com.proto;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.Parser;
import org.apache.tika.parser.pdf.PDFParser;
import org.apache.tika.sax.BodyContentHandler;
import org.xml.sax.SAXException;
import org.apache.poi.xssf.usermodel.XSSFSheet;
/**
 * @author BA354098
 *
 */
public class WorkbookTrial
{

	

	/**
	 * 
	 */
	public static XSSFWorkbook wb;

	/**
	 * @param args
	 * @throws IOException
	 * @throws TikaException 
	 * @throws SAXException 
	 */
	
	@SuppressWarnings("unused")
	public static void main(String[] args) throws IOException, SAXException, TikaException
	{
		

	    wb = new XSSFWorkbook();
	    XSSFSheet sheet1 = wb.createSheet("sheet 1");
	    XSSFSheet sheet2 = wb.createSheet("sheet 2");
	    XSSFSheet sheet3 = wb.createSheet("sheet 3");
	    FileOutputStream fileOut1 = new FileOutputStream("d:/workbook.xlsx");
	    wb.write(fileOut1);
	    fileOut1.close();

	    File folder=new File("d:\\CT_Reports");
	    File[] listOfFiles = folder.listFiles();

	    for (File file:listOfFiles) {
	   	 
	      if (file.isFile()) {
	       
	      	System.err.println("Reading the File " + file.getName());	      	
	      	BodyContentHandler handler = new BodyContentHandler(Integer.MAX_VALUE);
		      Metadata metadata = new Metadata();
		      FileInputStream inputstream = new FileInputStream(new File("d:\\CT_Reports\\"+file.getName()));
		      ParseContext pcontext = new ParseContext();
		      Parser parser = new AutoDetectParser(); 
		      parser.parse(inputstream, handler, metadata,pcontext);
		      
		      //getting the content of the document
		      System.out.println("Contents of the PDF :");
		      String data[]=handler.toString().split("\n");
//		      for(String s:data)
//		      	if(s.length()!=0)
//		      	System.out.println(s);
		      
		      Tika tika = new Tika();
		      String filecontent = tika.parseToString(file);
		      System.out.println("Extracted Content: " + filecontent);
		      
		      
		      //getting metadata of the document
//		      System.out.println("Metadata of the PDF:");
//		      String[] metadataNames = metadata.names();
//		      
//		      for(String name : metadataNames) {
//		         System.out.println(name+ " : " + metadata.get(name));
//		      }
	      } 
	    
	    }
	    
		 

	}

}
