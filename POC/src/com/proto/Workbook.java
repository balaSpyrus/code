package com.proto;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFSheet;


/**
 * @author BA354098
 *
 */
public class Workbook
{

	/**
	 * 
	 */
	public static XSSFWorkbook wb;

	/**
	 * @param args
	 * @throws IOException
	 * @throws TikaException
	 */

	public static void main(String[] args) throws IOException, TikaException
	{
		wb = new XSSFWorkbook();
		createShipToSummary(new File("d:\\test\\ship_to_summary.txt"));
		createProductSummary(new File("d:\\test\\product_summary.txt"));
		FileOutputStream fileOut1 = new FileOutputStream("d:\\workbook.xlsx");
		wb.write(fileOut1);
		fileOut1.close();
	}

	@SuppressWarnings(
	{ "deprecation" })
	private static void createProductSummary(File file) throws IOException, TikaException
	{
		int rows = 1, index = 0;
		StringBuilder formula = new StringBuilder("SUM(");
		List<String> fileDatas = getFileDatas(file);
		XSSFSheet sheet = wb.createSheet(file.getName().replace(" ", "_").substring(0, file.getName().indexOf('.')));
		Row tempRow = null;
		while (index != 6)
		{
			tempRow = sheet.createRow((short) rows++);
			createCell(tempRow, 1, 8, CellStyle.ALIGN_CENTER, CellType.STRING, fileDatas.get(index++));
			if (index < 4)
				createCell(tempRow, 9, 11, CellStyle.ALIGN_LEFT, CellType.STRING, fileDatas.get(index++));
		}
		rows++;
		for (; index < fileDatas.size(); rows++)
		{
			tempRow = sheet.createRow((short) rows);
			if (fileDatas.get(index).split(",").length != 1)
			{
				String colData[] = fileDatas.get(index++).split(",");
				for (int i = 0; i < colData.length; i++)
				{
					if (i == 0)
						createCell(tempRow, i + 1, 4, CellStyle.ALIGN_GENERAL, CellType.STRING, colData[i]);
					else
					{
						String details = createCell(tempRow, tempRow.getPhysicalNumberOfCells() + 3 + i,
								tempRow.getPhysicalNumberOfCells() + 4 + i, CellStyle.ALIGN_GENERAL, CellType.STRING, colData[i]);

						if (i == 1)
						{
							String detailsArr[] = details.split(",");
							try
							{
								Float.parseFloat(detailsArr[0]);
								formula.append(detailsArr[1].trim() + ",");
							}
							catch (Exception e)
							{
								//System.err.println(e.getMessage());
							}
						}
					}
				}
			}
			else
			{
				if (rows != fileDatas.size() - 1)
					createCell(tempRow, 1, 8, CellStyle.ALIGN_LEFT, CellType.STRING, fileDatas.get(index++));
				else
				{
					formula.deleteCharAt(formula.lastIndexOf(","));
					formula.append(')');
					createCell(tempRow, 1, 4, CellStyle.ALIGN_RIGHT, CellType.STRING, "Total");
					createCell(tempRow, 5, 6, CellStyle.ALIGN_GENERAL, CellType.FORMULA, formula.toString());
					tempRow = sheet.createRow((short) ++rows);
					createCell(tempRow, 1, 11, CellStyle.ALIGN_CENTER, CellType.STRING, fileDatas.get(index++));

				}

			}

		}

	}

	@SuppressWarnings(
	{ "deprecation" })
	private static void createShipToSummary(File file) throws IOException, TikaException
	{
		int rows = 1, index = 0;
		String divName = "";
		List<String> fileDatas = getFileDatas(file);
		List<String> cellAddress = new ArrayList<String>();
		XSSFSheet sheet = wb.createSheet(file.getName().replace(" ", "_").substring(0, file.getName().indexOf('.')));
		Row tempRow = null;
		while (index != 5)
		{
			tempRow = sheet.createRow((short) rows++);
			createCell(tempRow, 1, 14, CellStyle.ALIGN_CENTER, CellType.STRING, fileDatas.get(index++));
			if (index < 4)
				createCell(tempRow, 15, 17, CellStyle.ALIGN_LEFT, CellType.STRING, fileDatas.get(index++));
		}
		rows++;
		for (; index < fileDatas.size(); rows++)
		{
			tempRow = sheet.createRow((short) rows);
			if (fileDatas.get(index).split(",").length != 1)
			{
				String colData[] = fileDatas.get(index++).split(",");
				StringBuilder s = null;
				for (int i = 0; i < colData.length; i++)
				{
					if (i <= 3)
						createCell(tempRow, i + 1, -1, CellStyle.ALIGN_GENERAL, CellType.STRING, colData[i]);
					else if (i == 4)
					{
						try
						{
							Float.parseFloat(colData[i].matches("-") ? "0" : colData[i]);
							s = new StringBuilder(tempRow.getCell(i).getAddress().toString());
							s.setCharAt(0, (char) (s.charAt(0) + 2));
							s.append(":" + (char) (s.charAt(0) + 11) + s.substring(1, s.length()));
							s.append(')');
							s.insert(0, "SUM(");
							String tempAdd = createCell(tempRow, i + 1, -1, CellStyle.ALIGN_GENERAL, CellType.FORMULA, s.toString());
							s = new StringBuilder();
							s.append(tempAdd.split(",")[1] + ",");
							tempAdd = createCell(tempRow, i + 2, -1, CellStyle.ALIGN_GENERAL, CellType.FORMULA, colData[i]);
							s.append(tempAdd.split(",")[1]);
						}
						catch (Exception e)
						{
							createCell(tempRow, i + 1, -1, CellStyle.ALIGN_GENERAL, CellType.STRING, "Total_MSF_Shipped");
							createCell(tempRow, i + 2, -1, CellStyle.ALIGN_GENERAL, CellType.STRING, colData[i]);
						}

					}
					else
					{
						String tempAdd = createCell(tempRow, i + 2, -1, CellStyle.ALIGN_GENERAL, CellType.STRING, colData[i]);
						try
						{
							Float.parseFloat(colData[i].contains("-") ? "0" : colData[i]);
							s.append("," + tempAdd.split(",")[1]);
						}
						catch (Exception e)
						{
							//System.err.println(e);
						}
					}
				}
				if (s != null)
					cellAddress.add(s.toString());
			}
			else
			{
				if (divName != "")
				{
					Iterator<String> it = cellAddress.iterator();
					String[] formulas = new String[cellAddress.get(0).split(",").length];
					while (it.hasNext())
					{
						String eachAdd[] = it.next().split(",");
						int i;
						for (i = 0; i < eachAdd.length; i++)
							if (formulas[i] == null)
								formulas[i] = "SUM(" + eachAdd[i];
							else
								formulas[i] += "," + eachAdd[i];
					}
					createCell(tempRow, 1, 4, CellStyle.ALIGN_RIGHT, CellType.STRING, "Total_for_TX");

					for (String eachFormula : formulas)
						createCell(tempRow, tempRow.getPhysicalNumberOfCells() + 4, -1, CellStyle.ALIGN_RIGHT, CellType.FORMULA,
								eachFormula + ")");

					tempRow = sheet.createRow((short) ++rows);
					createCell(tempRow, 1, 4, CellStyle.ALIGN_RIGHT, CellType.STRING, "Total_for_" + divName.replaceAll(" ", "_"));

					for (String eachFormula : formulas)
						createCell(tempRow, tempRow.getPhysicalNumberOfCells() + 4, -1, CellStyle.ALIGN_RIGHT, CellType.FORMULA,
								eachFormula + ")");

					cellAddress.clear();
					tempRow = sheet.createRow((short) ++rows);
				}
				divName = fileDatas.get(index);
				createCell(tempRow, 1, 17, index == fileDatas.size() - 1 ? CellStyle.ALIGN_CENTER : CellStyle.ALIGN_LEFT,
						CellType.STRING, fileDatas.get(index++));
			}
		}
	}

	private static List<String> getFileDatas(File file) throws IOException, TikaException
	{
		List<String> list = new LinkedList<String>();
		System.err.println("Reading the File " + file.getName());
		Tika tika = new Tika();
		String filecontent = tika.parseToString(file);
		String data[] = filecontent.toString().split("\n");
		for (String s : data)
			list.add(s);
		return list;
	}

	@SuppressWarnings("deprecation")
	private static String createCell(Row row, int col, int colend, short halign, CellType type, String data)
	{
		data = data.trim().equals("-") ? "0" : data.trim();
		Cell cell = row.createCell(col);
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
			row.getSheet().addMergedRegion(new CellRangeAddress(row.getRowNum(), //first row (0-based)
					row.getRowNum(), //last row  (0-based)
					col, //first column (0-based)
					colend //last column  (0-based)
			));
		row.getSheet().autoSizeColumn(col);
		//System.out.println("Data : " + data + " Cell : " + cell.getAddress() + " Row : " + (row.getRowNum()));
		return data + "," + cell.getAddress() + "," + (row.getRowNum());
	}

}
