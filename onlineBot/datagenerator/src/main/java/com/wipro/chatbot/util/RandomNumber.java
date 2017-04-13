package com.wipro.chatbot.util;
import java.util.*;
import java.io.*;
public class RandomNumber{
   public static void main(String [] args)throws IOException
   {
      PrintWriter out = new PrintWriter(new File("random.txt"));
      Random rand = new Random();
      int number, count=1;
      while(count<=100)
      {
            number=rand.nextInt(100)+1;
            out.print(number);
            count++;
            out.println();
      } 
      out.close();
      BufferedReader bufferedReader = null;
      try {
          String numb;
          bufferedReader = new BufferedReader(new FileReader("random.txt"));
          while ((numb = bufferedReader.readLine()) != null) {
              System.out.println(numb);
          }
      } catch (Exception ex) {
          System.out.println(ex.getMessage());
      } finally {
          bufferedReader.close();
      }
  }
}