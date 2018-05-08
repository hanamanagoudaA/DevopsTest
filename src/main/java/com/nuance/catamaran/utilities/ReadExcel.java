/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nuance.catamaran.utilities;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.servlet.ServletContext;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 *
 * @author ivrdev2
 */
public class ReadExcel {

    public static List<String> getColumnHeading(Iterator<Row> rowIteratorForFirstRow) {

        List<String> column = new ArrayList<>();

        while (rowIteratorForFirstRow.hasNext()) {
            Row row = rowIteratorForFirstRow.next();
            Iterator<Cell> cellIterator = row.cellIterator();
            while (cellIterator.hasNext()) {

                Cell cell = cellIterator.next();
                //Check the cell type and format accordingly

                switch (cell.getCellType()) {
                    case Cell.CELL_TYPE_NUMERIC:
                        column.add(Double.toString(cell.getNumericCellValue()));
                        break;
                    case Cell.CELL_TYPE_STRING:
                        column.add(cell.getStringCellValue());
                        break;
                }
            }
            break;
        }
        //only first row need ti itrate to cat column names 
        return column;
    }

    public static List<String> getTFNList(XSSFSheet sheet) {

        List<String> tfnList = new ArrayList<>();
        //get heading for each column of xlsx file 
        //Iterate through each rows one by one
        Iterator<Row> rowIterator = sheet.iterator();
        List<String> column = ReadExcel.getColumnHeading(rowIterator);
        int indexOfTfnId = column.indexOf("TFNID");
        if (indexOfTfnId != -1) {
            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                Iterator<Cell> cellIterator = row.cellIterator();
                Cell cell = row.getCell(indexOfTfnId);
                //Check the cell type and format accordingly

                switch (cell.getCellType()) {
                    case Cell.CELL_TYPE_NUMERIC:
                        tfnList.add(Double.toString(cell.getNumericCellValue()));
                        break;
                    case Cell.CELL_TYPE_STRING:
                        if (cell.getStringCellValue().compareToIgnoreCase("tfnid") != 0) {
                            tfnList.add(cell.getStringCellValue());
                        }
                        break;
                }
            }
        }
        return tfnList;
    }

    public static Map<String, String> getRowValue(Iterator<Row> rowIterator, List<String> column, String Tfn) {
        Map<String, String> columnValueMap = new HashMap<>();
        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();
            String tfnSheetValue = "";
            //For each row, iterate through all the columns
            int indexOfTfnId = column.indexOf("TFNID");
            switch (row.getCell(indexOfTfnId).getCellType()) {
                case Cell.CELL_TYPE_NUMERIC:
                    tfnSheetValue = Double.toString(row.getCell(indexOfTfnId).getNumericCellValue());
                    break;
                case Cell.CELL_TYPE_STRING:
                    tfnSheetValue = row.getCell(indexOfTfnId).getStringCellValue();
                    break;
            }
            if (tfnSheetValue.equalsIgnoreCase(Tfn)) {
                Iterator<Cell> cellIterator = row.cellIterator();
                int columIndex = 0;
                while (cellIterator.hasNext()) {

                    Cell cell = cellIterator.next();

                    //Check the cell type and format accordingly
                    switch (cell.getCellType()) {
                        case Cell.CELL_TYPE_NUMERIC:
                            columnValueMap.put(column.get(columIndex), Double.toString(cell.getNumericCellValue()));
                            break;
                        case Cell.CELL_TYPE_STRING:
                            columnValueMap.put(column.get(columIndex), cell.getStringCellValue().trim());
                            break;
                    }
                    columIndex++;
                }
            }
        }

        return columnValueMap;
    }

    protected static LinkedHashMap getXlsPropertyMaping(String configPath) {

        String backendURLsFile = configPath + "proptoxls.properties";
        LinkedHashMap result = new LinkedHashMap();
        BufferedReader br = null;

        try {

            String sCurrentLine;
            String[] propertySplit;
            br = new BufferedReader(new FileReader(backendURLsFile));

            while ((sCurrentLine = br.readLine()) != null) {
                if (sCurrentLine.contains("=")) {
                    propertySplit = sCurrentLine.split("=");
                    if (propertySplit.length > 1) {
                        result.put(propertySplit[0], propertySplit[1]);
                    }
                }

            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return result;
    }

    public static String getPropertyDeployed(String Tfnlist, String fileName, ServletContext context) throws FileNotFoundException, IOException {
        String path = context.getRealPath("") + "/configuration/application/properties/profilesTemp/";
        String deployPath = context.getRealPath("") + "/configuration/application/properties/profilesTemp/";
        String configPath = context.getRealPath("") + "/configuration/application/properties/";
        FileInputStream file = new FileInputStream(new File(path + fileName));
        List<String> response = new ArrayList<>();
        String[] tfnArray = Tfnlist.split(";");
        List<String> column = new ArrayList<>();
        Map<String, String> ValueMap = new HashMap<>();
        LinkedHashMap PropMap = new LinkedHashMap();
        LinkedHashMap finalResult = new LinkedHashMap();
        String finalString = "";
        //GetXlsPropertyMaping getXlsPropertyMaping=new GetXlsPropertyMaping();
        for (String tfnIt : tfnArray) {
            response.add(deployPath + "/profile" + tfnIt + ".properties");
        }
        //loading xls to profile mapping
        PropMap = ReadExcel.getXlsPropertyMaping(configPath);

        //Create Workbook instance holding reference to .xlsx file
        XSSFWorkbook workbook = new XSSFWorkbook(file);

        //Get first/desired sheet from the workbook
        XSSFSheet sheet = workbook.getSheetAt(0);

        //Iterate through each rows one by one
        Iterator<Row> rowIterator = sheet.iterator();

        //get heading for each column of xlsx file 
        column = ReadExcel.getColumnHeading(rowIterator);
        /*for(String checkSheet: PropMap.keySet())
         {
         if(!column.contains(PropMap.get(checkSheet)) && !PropMap.get(checkSheet).contains("'"))
         {
         response=response+"Sheet not contains -->"+PropMap.get(checkSheet)+",";
         }
         }*/

        try {
            //get row values 
            for (String tfn : tfnArray) {

                finalString = "";
                rowIterator = sheet.iterator();
                ValueMap = ReadExcel.getRowValue(rowIterator, column, tfn);
                Set set = PropMap.entrySet();
                //ittrator
                Iterator i;
                i = set.iterator();
                while (i.hasNext()) {
                    Map.Entry me = (Map.Entry) i.next();
                    String propKey = (String) me.getKey();
                    String propvalue = (String) me.getValue();

                    if (propvalue != null) {
                        if (propvalue.contains("'")) {
                            String[] tmp;
                            tmp = propvalue.split("'");
                            if (tmp.length > 1) {
                                finalResult.put(propKey, tmp[1]);
                            } else {
                                finalResult.put(propKey, "");
                            }

                        } else if (propvalue.contains("#")) {
                            String[] tmp = null;
                            tmp = propvalue.split("#");
                            if (tmp.length > 1) {
                                if (ValueMap.get(tmp[0]) == null || ValueMap.get(tmp[0]) == "") {
                                    finalResult.put(propKey, tmp[1]);
                                } else {
                                    finalResult.put(propKey, ValueMap.get(tmp[0]));
                                }
                            } else {
                                finalResult.put(propKey, ValueMap.get(propvalue));
                            }
                        } else {
                            finalResult.put(propKey, ValueMap.get(propvalue));
                        }

                    }
                }
                set = finalResult.entrySet();
                //ittrator
                i = set.iterator();
                while (i.hasNext()) {
                    Map.Entry me = (Map.Entry) i.next();
                    String propKey = (String) me.getKey();
                    String propvalue = (String) me.getValue();
                    if (propvalue != null) {
                        if (propvalue.equalsIgnoreCase("E")) {
                            propvalue = "english";
                        } else if (propvalue.equalsIgnoreCase("yes")) {
                            propvalue = "Y";
                        } else if (propvalue.equalsIgnoreCase("no")) {
                            propvalue = "N";
                        }

                        finalString = finalString + "" + propKey + "=" + propvalue + "\n";
                    } else {
                        finalString = finalString + "" + propKey + "=\n";
                    }
                }
                //System.out.println("finalString"+finalString);
                //writing file 
                PrintWriter writer = new PrintWriter(deployPath + "/profile" + tfn + ".properties", "UTF-8");
                writer.println(finalString);
                writer.close();

            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (file != null) {
                    file.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        fileName.substring(0, fileName.indexOf("."));
        String zipFilePath = ReadExcel.getfilesZip(response, deployPath + fileName + ".zip");
        return zipFilePath;
    }

    public static String getfilesZip(List<String> filesName, String zipFilePath) {
        String res = zipFilePath;

        FileOutputStream fos = null;
        ZipOutputStream zipOut = null;
        FileInputStream fis = null;
        try {
            fos = new FileOutputStream(zipFilePath);
            zipOut = new ZipOutputStream(new BufferedOutputStream(fos));
            for (String filePath : filesName) {
                File input = new File(filePath);
                fis = new FileInputStream(input);
                ZipEntry ze = new ZipEntry(input.getName());
//                System.out.println("Zipping the file: " + input.getName());
                zipOut.putNextEntry(ze);
                byte[] tmp = new byte[4 * 1024];
                int size = 0;
                while ((size = fis.read(tmp)) != -1) {
                    zipOut.write(tmp, 0, size);
                }
                zipOut.flush();
                fis.close();
                input.deleteOnExit();
            }
            zipOut.close();
//            System.out.println("Done... Zipped the files...");
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            try {
                if (fos != null) {
                    fos.close();
                }
            } catch (Exception ex) {

            }
        }
        return res;
    }
}
