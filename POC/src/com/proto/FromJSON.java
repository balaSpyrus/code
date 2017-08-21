package com.proto;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.util.Iterator;
import java.util.Set;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;


/**
 * @author BA354098
 *
 */
public class FromJSON
{
	/**
	 * 
	 */
	public static XSSFWorkbook wb;

	/**
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException
	{
		wb = new XSSFWorkbook();
		//createFromJSON(new File("d:\\test\\sample1.json"));
		createFromJSON(new File("d:\\test\\product_summaryJSON.json"));
		//createFromJSON(new File("d:\\test\\ship_to_summaryJSON.json"));
		FileOutputStream fileOut = new FileOutputStream("d:\\JSON.xlsx");
		wb.write(fileOut);
		fileOut.close();
	}

	@SuppressWarnings("unused")
	private static void createFromJSON(File file)
	{
		JSONParser parser = new JSONParser();
		try
		{

			Object obj = parser.parse(new FileReader(file));		
			XSSFSheet sheet = wb.createSheet(file.getName().replace(" ", "_").substring(0, file.getName().indexOf('.')));
			emiteJSONDataOnSheet(obj,null);
			//          System.out.println(name);
			//
			//          long age = (Long) jsonObject.get("age");
			//          System.out.println(age);
			//
			//          // loop array
			//          JSONArray msg = (JSONArray) jsonObject.get("messages");
			//          Iterator<String> iterator = msg.iterator();
			//          while (iterator.hasNext()) {
			//              System.out.println(iterator.next());
			//          }

		}
		catch (Exception e)
		{
			e.printStackTrace();
		}

	}

	@SuppressWarnings("unchecked")
	private static void emiteJSONDataOnSheet(Object obj,String key)
	{ 
		
		if(obj instanceof JSONArray)
		{	
			System.err.println(key!=null?" Array key : "+key:"");
			JSONArray msg = (JSONArray) obj;
			Iterator<Object> it = msg.iterator();
			while (it.hasNext())				
			emiteJSONDataOnSheet(it.next(),null);				
			
		}
		else if(obj instanceof JSONObject)
		{
			System.err.println(key!=null?" Object key : "+key:"");
			JSONObject jsonObject = (JSONObject) obj;				
			//System.out.println(jsonObject.toString());
			Set<Object> keys = jsonObject.keySet();
			Iterator<Object> iterator = keys.iterator();
			while (iterator.hasNext())
			{
				String k=(String) iterator.next();
				emiteJSONDataOnSheet(jsonObject.get(k),k);			
			}
		}	
		else
		{
			System.err.println(key!=null?" key : "+key:"");
			try
			{				
				System.out.print(" float   :   "+Float.parseFloat(obj.toString())+"\n");						
			}
			catch (Exception e)
			{
				System.out.print(" String :   "+obj.toString()+"\n");		
			}
		}		
	}
}
