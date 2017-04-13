/* data insertion and data reading from MySQL*/

package com.wipro.chatbot.util;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.sql.*;

public class DBConnection{

	/**
	 * This main class establishing the database connection,
	 * inserting data to database,reading data from database,
	 * and closing the connection after all operations 
	 */
	public static void main(String[] args) throws Exception  {
		// TODO Auto-generated method stub
		InputStreamReader r=new InputStreamReader(System.in);  
		BufferedReader br=new BufferedReader(r);  
		  
		System.out.println("Enter username");  
		String username=br.readLine();  
		System.out.println("Enter password");  
		String password=br.readLine(); 
		Connection conn=getConnection();
		insertIntoDatabase(conn,username,password);
		readFromDatabase(conn);
		connectionClose(conn);
	}
	
	public static Connection getConnection() throws Exception{
		try{
			String driver="com.mysql.jdbc.Driver";
			String url="Jdbc:mysql://localhost/demo";
			String username="root";
			String password="root";
			Class.forName(driver);
			Connection conn = DriverManager.getConnection(url,username,password);
			System.out.println("Connection established with database..!");
			return conn;
		} 
		catch(Exception e)
		{
			System.out.println(e);
		}
		
		return null;
	}
	public static Connection readFromDatabase(Connection conn) throws Exception{
		try{
				Statement stmt;
				ResultSet rs;
				stmt=conn.createStatement();
				rs=stmt.executeQuery("Select username, password from user");
				while(rs.next()){
					System.out.println(rs.getString(1)+" "+rs.getString(2));
				}
				System.out.println("Data Reading Successful..!");
		    } // end of try block
		catch(SQLException e){
				System.out.println(e);
			}
		return conn;
		}
	
	public static Connection insertIntoDatabase(Connection conn,String username,String password) throws Exception{
		PreparedStatement pst=null;
		try{
				pst=conn.prepareStatement("INSERT INTO user(username,password) VALUES(?,?)");
				pst.setString(1,username);
				pst.setString(2, password);
				pst.executeUpdate();
				System.out.println("Data Insertion Successful..!");
		    } // end of try block
		catch(SQLException e){
				System.out.println(e);
			}
		return conn;
		}
	
	public static Connection connectionClose(Connection conn) throws Exception{
		try{
				conn.close();
				System.out.println("Datadase connection closed..!");
		    } // end of try block
		catch(SQLException e){
				System.out.println(e);
			}
		return conn;
		}
}
