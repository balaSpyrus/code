package com.proto;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;


/**
 * @author BA354098
 *
 */
public class WorkbookReadPDF
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

	@SuppressWarnings("unused")
	public static void main(String[] args) throws IOException, TikaException
	{
		wb = new XSSFWorkbook();

		List<ArrayList<String>> fileDatas = getFileDatas("d:\\CT_Reports");

		FileOutputStream fileOut1 = new FileOutputStream("d:\\workbook.xlsx");
		wb.write(fileOut1);
		fileOut1.close();

	}

	private static List<ArrayList<String>> getFileDatas(String path) throws IOException, TikaException
	{
		List<ArrayList<String>> list = new LinkedList<ArrayList<String>>();
		File folder = new File(path);
		File[] listOfFiles = folder.listFiles();
		for (File file : listOfFiles)
		{

			if (file.isFile())
			{
				ArrayList<String> dataList = new ArrayList<String>();
				dataList.add(file.getName());

				XSSFSheet sheet = wb.createSheet(file.getName().replace(" ", "_").substring(0, file.getName().indexOf('.')));
				System.err.println("Reading the File " + file.getName());

				Tika tika = new Tika();
				String filecontent = tika.parseToString(file);
				//  System.out.println("Extracted Content: " + filecontent);
				String data[] = filecontent.toString().split("\n");

				int rowCount = 0, totalCellCount = 0;
				for (String s : data)
				{

					if (s.length() != 0)
					{
						dataList.add(s);
						int cellCount = 0;
						Row row = sheet.createRow(rowCount++);
						String cellData[] = s.toString().split(" ");
						for (String cd : cellData)
						{
							row.createCell(cellCount++).setCellValue(cd);

						}

						totalCellCount += cellCount;
					}

				}
				System.out.println("rows :" + rowCount + " cells :" + totalCellCount);
				list.add(dataList);
			}

		}
		return list;
	}

}
