package com.proto;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.util.Iterator;
import java.util.Set;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.CellRangeAddress;
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
	@SuppressWarnings("javadoc")
	public static JSONObject obj;
	@SuppressWarnings("javadoc")
	public static Row tempRow;
	@SuppressWarnings("javadoc")
	public static int rows = 1;

	/**
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException
	{
		wb = new XSSFWorkbook();
		createFromJSON(new File("d:\\test\\product_summary.json"), 11);
		createFromJSON(new File("d:\\test\\ship_to_summary.json"), 17);
		//createFromJSON(new File("d:\\test\\main_summary.json"), 13);
		//createFromJSON(new File("d:\\test\\truck_rail_summary.json"), 10);
		FileOutputStream fileOut = new FileOutputStream("d:\\JSON.xlsx");
		wb.write(fileOut);
		fileOut.close();
	}

	@SuppressWarnings(
	{ "deprecation", "unchecked" })
	private static void createFromJSON(File file, int length)
	{
		JSONParser parser = new JSONParser();

		try
		{
			obj = (JSONObject) parser.parse(new FileReader(file));
			XSSFSheet sheet = wb.createSheet(file.getName().replace(" ", "_").substring(0, file.getName().indexOf('.')));

			//			//to extract every data from the json 
			//			//emiteJSONDataOnSheet(obj,null);

			getHeaders(sheet, length);

			JSONArray dataArr = (JSONArray) obj.get("datas");
			Iterator<Object> itd = dataArr.iterator();
			tempRow = sheet.createRow((short) rows++);
			createCell(1, length, CellStyle.ALIGN_CENTER, CellType.STRING,"");
			while (itd.hasNext())
			{
				
				extractDataValues(null, itd.next(), sheet, length);
			}

			tempRow = sheet.createRow((short) rows++);
			createCell(1, length, CellStyle.ALIGN_CENTER, CellType.STRING, obj.get("note").toString());
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			obj.clear();
			tempRow = null;
			rows = 1;
		}

	}
	
	private static void extractDataValues(String key, Object value, XSSFSheet sheet, int length)
	{
		
		if(sheet.getSheetName().contains("truck")||sheet.getSheetName().contains("main"))
			extractDataFormat2(key,value,sheet,length);
		else
			extractDataFormat1(key,value,sheet,length);
		
		
	}

	private static void extractDataFormat2(String key, Object value, XSSFSheet sheet, int length)
	{
		// TODO Auto-generated method stub
		
	}

	
	private static void extractDataFormat1(String key, Object value, XSSFSheet sheet, int length)
	{
		JSONObject jObj= (JSONObject) value;
		System.out.println(jObj.keySet());		
	}

	@SuppressWarnings("deprecation")
	private static int getHeaders(XSSFSheet sheet, int length)
	{
		tempRow = sheet.createRow((short) rows++);
		createCell(1, length - 3, CellStyle.ALIGN_CENTER, CellType.STRING, obj.get("title").toString());
		createCell(length - 2, length, CellStyle.ALIGN_LEFT, CellType.STRING, "Report Date : " + obj.get("reportDate").toString());

		if (obj.get("title2") != null && obj.get("customerLevel") != null)
		{
			tempRow = sheet.createRow((short) rows++);
			createCell(1, length - 3, CellStyle.ALIGN_CENTER, CellType.STRING, obj.get("title2").toString());
			createCell(length - 2, length, CellStyle.ALIGN_LEFT, CellType.STRING,
					"Report Name : " + obj.get("reportName").toString());
			tempRow = sheet.createRow((short) rows++);
			createCell(1, length - 3, CellStyle.ALIGN_CENTER, CellType.STRING,
					"Customer Level : " + obj.get("customerLevel").toString());
			tempRow = sheet.createRow((short) rows++);
			createCell(1, length - 3, CellStyle.ALIGN_CENTER, CellType.STRING, "Customer : " + obj.get("Customer").toString());
		}
		else
		{
			tempRow = sheet.createRow((short) rows++);
			createCell(1, length - 3, CellStyle.ALIGN_CENTER, CellType.STRING, "Customer : " + obj.get("Customer").toString());
			createCell(length - 2, length, CellStyle.ALIGN_LEFT, CellType.STRING,
					"Report Name : " + obj.get("reportName").toString());
		}

		if (obj.get("duration") != null)
		{
			tempRow = sheet.createRow((short) rows++);
			createCell(1, length - 3, CellStyle.ALIGN_CENTER, CellType.STRING, "Date Range : " + obj.get("duration").toString());
		}

		tempRow = sheet.createRow((short) rows++);
		createCell(1, length - 3, CellStyle.ALIGN_CENTER, CellType.STRING, getOtherDetails(obj));

		return rows;

	}


	@SuppressWarnings("unchecked")
	private static String getOtherDetails(JSONObject obj)
	{
		JSONObject otrDet = (JSONObject) obj.get("otherDetails");
		Iterator<String> it1 = otrDet.keySet().iterator();
		String otr = "";
		while (it1.hasNext())
		{
			String temp = it1.next();
			otr += temp.replaceAll("_", " ") + " : " + otrDet.get(temp) + " , ";
		}

		return otr.substring(0, otr.length() - 2);
	}

	//prototype method keeping it for reference
	@SuppressWarnings(
	{ "unchecked", "unused" })
	private static void emiteJSONData(Object obj, String key)
	{

		if (obj instanceof JSONArray)
		{

			JSONArray msg = (JSONArray) obj;
			Iterator<Object> it = msg.iterator();
			System.err.println(key + "  :  " + msg.size());
			while (it.hasNext())
				emiteJSONData(it.next(), null);

		}
		else if (obj instanceof JSONObject)
		{

			JSONObject jsonObject = (JSONObject) obj;
			Set<Object> keys = jsonObject.keySet();
			Iterator<Object> iterator = keys.iterator();
			if (key != null)
				System.out.println(key + "  :  " + jsonObject.size());
			while (iterator.hasNext())
			{
				String k = (String) iterator.next();
				emiteJSONData(jsonObject.get(k), k);
			}
		}
		else
		{

			System.out.println(key + "  :  " + obj);

			//			try
			//			{				
			//				System.out.print(" float   :   "+Float.parseFloat(obj.toString())+"\n");						
			//			}
			//			catch (Exception e)
			//			{
			//				System.out.print(" String :   "+obj.toString()+"\n");		
			//			}
		}
	}

	@SuppressWarnings("deprecation")
	private static String createCell(int col, int colend, short halign, CellType type, String data)
	{
		data = data.trim().equals("-") ? "0" : data.trim();
		Cell cell = tempRow.createCell(col);
		if (type == CellType.FORMULA)
		{
			cell.setCellFormula(data);
		}
		else
		{
			try
			{
				cell.setCellValue(Float.parseFloat(data));
			}
			catch (Exception e)
			{
				try
				{
					cell.setCellValue(Integer.parseInt(data));
				}
				catch (Exception e1)
				{
					cell.setCellValue(data);
				}
			}
		}
		CellStyle cellStyle = wb.createCellStyle();
		cellStyle.setAlignment(halign);
		cell.setCellStyle(cellStyle);
		if (colend != -1)
			tempRow.getSheet().addMergedRegion(new CellRangeAddress(tempRow.getRowNum(), //first row (0-based)
					tempRow.getRowNum(), //last row  (0-based)
					col, //first column (0-based)
					colend //last column  (0-based)
			));
		tempRow.getSheet().autoSizeColumn(col);
		//System.out.println("Data : " + data + " Cell : " + cell.getAddress() + " Row : " + (row.getRowNum()));
		return data + "," + cell.getAddress() + "," + (tempRow.getRowNum());
	}
}




