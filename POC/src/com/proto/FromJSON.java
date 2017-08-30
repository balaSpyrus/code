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
import org.apache.wink.json4j.JSONArray;
import org.apache.wink.json4j.JSONException;
import org.apache.wink.json4j.JSONObject;
import org.apache.wink.json4j.OrderedJSONObject;



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
	public static OrderedJSONObject obj;
	@SuppressWarnings("javadoc")
	public static Row tempRow;
	@SuppressWarnings("javadoc")
	public static int rows = 1;
	@SuppressWarnings("javadoc")
	public static boolean flag;

	/**
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException
	{
		wb = new XSSFWorkbook();
		createFromJSON(new File("d:\\test\\product_summary.json"), 11);
		createFromJSON(new File("d:\\test\\ship_to_summary.json"), 17);
		createFromJSON(new File("d:\\test\\main_summary.json"), 13);
		createFromJSON(new File("d:\\test\\truck_rail_summary.json"), 10);
		FileOutputStream fileOut = new FileOutputStream("d:\\CT_Reports.xlsx");
		wb.write(fileOut);
		fileOut.close();
	}

	@SuppressWarnings(
	{ "deprecation", "unchecked" })
	private static void createFromJSON(File file, int length)
	{
		try
		{
			obj = new OrderedJSONObject(new FileReader(file));
			flag = false;
			XSSFSheet sheet = wb.createSheet(file.getName().replace(" ", "_").substring(0, file.getName().indexOf('.')));

			//			//to extract every data from the json 
			//			//emiteJSONDataOnSheet(obj,null);

			getHeaders(sheet, length);

			JSONArray dataArr = (JSONArray) obj.get("datas");
			Iterator<Object> itd = dataArr.iterator();
			tempRow = sheet.createRow((short) rows++);
			createCell(1, length, CellStyle.ALIGN_CENTER, CellType.STRING, "");

			while (itd.hasNext())
				extractDataValues(null, itd.next(), sheet, length);

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
			flag = false;
		}
	}

	private static void extractDataValues(String key, Object value, XSSFSheet sheet, int length) throws JSONException
	{

		if (sheet.getSheetName().contains("truck") || sheet.getSheetName().contains("main"))
			extractDataFormat2(key, value, sheet, length);
		else
			extractDataFormat1(key, value, sheet, length);
	}

	@SuppressWarnings(
	{ "unchecked", "deprecation" })
	private static void extractDataFormat2(String key, Object value, XSSFSheet sheet, int length) throws JSONException
	{
		OrderedJSONObject jObj = (OrderedJSONObject) value;
		Iterator<String> dataIt = jObj.getOrder();
		if (jObj.size() > 3)
		{
			if (flag == false)
			{
				tempRow = sheet.createRow((short) rows++);
				int start = 1, end = 2;
				while (dataIt.hasNext())
				{
					String dataKey = (String) dataIt.next();
					if (!dataKey.equals("sector"))
					{
						createCell(start, end, CellStyle.ALIGN_LEFT, CellType.STRING, dataKey);
						start = end + 1;
						end = start + 2;
					}
				}
				flag = true;
			}
			tempRow = sheet.createRow((short) rows++);
			createCell(1, length, CellStyle.ALIGN_LEFT, CellType.STRING, jObj.get("sector").toString());
			dataIt = jObj.getOrder();
			while (dataIt.hasNext())
			{
				String dataKey = (String) dataIt.next();
				if (!dataKey.equals("sector"))
				{

					Object months[] = jObj.getJSONArray(dataKey).toArray();
					Object currYr[] = jObj.getJSONArray(dataIt.next()).toArray();
					Object prevYr[] = jObj.getJSONArray(dataIt.next()).toArray();
					Object var[] = jObj.getJSONArray(dataIt.next()).toArray();

					for (int i = 0; i < months.length; i++)
					{
						tempRow = sheet.createRow((short) rows++);
						createCell(1, 2, CellStyle.ALIGN_LEFT, CellType.STRING, months[i].toString());
						createCell(3, 5, CellStyle.ALIGN_LEFT, CellType.STRING, currYr[i].toString());
						createCell(6, 8, CellStyle.ALIGN_LEFT, CellType.STRING, prevYr[i].toString());
						createCell(9, 11, CellStyle.ALIGN_LEFT, CellType.STRING, var[i].toString());
					}
				}
			}
		}
		else
		{
			if (flag == false)
			{
				tempRow = sheet.createRow((short) rows++);
				int start = 1, end = 2;
				while (dataIt.hasNext())
				{
					String dataKey = (String) dataIt.next();
					if (!dataKey.equals("sector"))
					{
						createCell(start, end, CellStyle.ALIGN_LEFT, CellType.STRING, dataKey);
						start = end + 1;
						end = start + 3;
					}
				}
				tempRow = sheet.createRow((short) rows++);
				dataIt = jObj.getOrder();
				start = 3;
				end = 4;
				while (dataIt.hasNext())
				{
					String dataKey = (String) dataIt.next();
					if (jObj.get(dataKey) instanceof OrderedJSONObject)
					{
						OrderedJSONObject data = (OrderedJSONObject) jObj.get(dataKey);
						Iterator<String> subHead = data.getOrder();
						while (subHead.hasNext())
						{
							createCell(start, end, CellStyle.ALIGN_LEFT, CellType.STRING, subHead.next().toString());
							start = end + 1;
							end = start + 1;
						}
					}
				}
				flag = true;
			}

			dataIt = jObj.getOrder();
			while (dataIt.hasNext())
			{
				Object months[], cr[] = null, ct[] = null, pr[] = null, pt[] = null;
				OrderedJSONObject temp;
				Iterator<String> tempIt;
				months = jObj.getJSONArray(dataIt.next()).toArray();
				temp = (OrderedJSONObject) jObj.get(dataIt.next());
				tempIt = temp.getOrder();
				while (tempIt.hasNext())
				{
					cr = temp.getJSONArray(tempIt.next()).toArray();
					ct = temp.getJSONArray(tempIt.next()).toArray();
				}
				temp = (OrderedJSONObject) jObj.get(dataIt.next());
				tempIt = temp.getOrder();
				while (tempIt.hasNext())
				{
					pr = temp.getJSONArray(tempIt.next()).toArray();
					pt = temp.getJSONArray(tempIt.next()).toArray();
				}

				for (int i = 0; i < months.length; i++)
				{
					tempRow = sheet.createRow((short) rows++);
					createCell(1, 2, CellStyle.ALIGN_LEFT, CellType.STRING, months[i].toString());
					createCell(3, 4, CellStyle.ALIGN_LEFT, CellType.STRING, cr[i].toString());
					createCell(5, 6, CellStyle.ALIGN_LEFT, CellType.STRING, ct[i].toString());
					createCell(7, 8, CellStyle.ALIGN_LEFT, CellType.STRING, pr[i].toString());
					createCell(9, 10, CellStyle.ALIGN_LEFT, CellType.STRING, pt[i].toString());
				}

			}
		}
	}

	@SuppressWarnings(
	{ "deprecation", "unchecked" })
	private static void extractDataFormat1(String key, Object value, XSSFSheet sheet, int length) throws JSONException
	{
		OrderedJSONObject jObj = (OrderedJSONObject) value;
		Iterator<String> dataIt = jObj.getOrder();
		while (dataIt.hasNext())
		{
			String dataKey = (String) dataIt.next();
			if (!dataKey.toLowerCase().contains("total"))
			{
				JSONArray jArr = jObj.getJSONArray(dataKey);
				Iterator<Object> arrIt = jArr.iterator();
				while (arrIt.hasNext() && flag == false)
				{
					OrderedJSONObject data = (OrderedJSONObject) arrIt.next();
					Iterator<String> keyIt = data.getOrder();
					tempRow = sheet.createRow((short) rows++);
					while (keyIt.hasNext())
						createCell(tempRow.getPhysicalNumberOfCells() + 1, -1, CellStyle.ALIGN_LEFT, CellType.STRING, keyIt.next());
					flag = true;
				}
				tempRow = sheet.createRow((short) rows++);
				createCell(1, length, CellStyle.ALIGN_LEFT, CellType.STRING, dataKey);
				arrIt = jArr.iterator();
				while (arrIt.hasNext())
				{
					OrderedJSONObject data = (OrderedJSONObject) arrIt.next();
					Iterator<String> keyIt = data.getOrder();
					tempRow = sheet.createRow((short) rows++);
					while (keyIt.hasNext())
						createCell(tempRow.getPhysicalNumberOfCells() + 1, -1, CellStyle.ALIGN_LEFT, CellType.STRING,
								data.get(keyIt.next()).toString());
				}
			}
			else
			{
				tempRow = sheet.createRow((short) rows++);
				if (dataKey.length() <= 5)
				{
					createCell(tempRow.getPhysicalNumberOfCells() + 1, -1, CellStyle.ALIGN_RIGHT, CellType.STRING, dataKey);
					createCell(tempRow.getPhysicalNumberOfCells() + 1, -1, CellStyle.ALIGN_LEFT, CellType.STRING,
							jObj.get(dataKey).toString());
				}
				else
				{
					createCell(tempRow.getPhysicalNumberOfCells() + 1, 4, CellStyle.ALIGN_RIGHT, CellType.STRING, dataKey);
					JSONArray jArr = jObj.getJSONArray(dataKey);
					Iterator<Integer> arrIt = jArr.iterator();
					while (arrIt.hasNext())
						createCell(tempRow.getPhysicalNumberOfCells() + 4, -1, CellStyle.ALIGN_LEFT, CellType.STRING,
								arrIt.next().toString());
				}
			}
		}
	}

	@SuppressWarnings("deprecation")
	private static int getHeaders(XSSFSheet sheet, int length) throws JSONException
	{
		tempRow = sheet.createRow((short) rows++);
		createCell(1, length - 3, CellStyle.ALIGN_CENTER, CellType.STRING, obj.get("title").toString());
		createCell(length - 2, length, CellStyle.ALIGN_LEFT, CellType.STRING, "Report Date : " + obj.get("reportDate").toString());

		if (obj.containsKey("title2") != false && obj.containsKey("customerLevel") != false)
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

		if (obj.containsKey("duration") != false)
		{
			tempRow = sheet.createRow((short) rows++);
			createCell(1, length - 3, CellStyle.ALIGN_CENTER, CellType.STRING, "Date Range : " + obj.get("duration").toString());
		}

		tempRow = sheet.createRow((short) rows++);
		createCell(1, length - 3, CellStyle.ALIGN_CENTER, CellType.STRING, getOtherDetails(obj));

		return rows;

	}

	@SuppressWarnings("unchecked")
	private static String getOtherDetails(JSONObject obj) throws JSONException
	{
		OrderedJSONObject otrDet = (OrderedJSONObject) obj.get("otherDetails");
		Iterator<String> it1 = otrDet.getOrder();
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
	private static void emiteJSONData(Object obj, String key) throws JSONException
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
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula(data);
		}
		else
		{
			cell.setCellType(CellType.NUMERIC);
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
					cell.setCellType(CellType.STRING);
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




