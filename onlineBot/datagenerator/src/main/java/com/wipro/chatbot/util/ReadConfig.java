package com.wipro.chatbot.util;
import java.io.FileReader;
import java.io.IOException;
import java.util.Map;
import com.esotericsoftware.yamlbeans.YamlReader;

public class ReadConfig {

	private  Map CONFIG=null;

	public static void main(String[] args) throws IOException {
		getConfig();
	}
	public static  Map getConfig() {
		try {
			YamlReader reader = new YamlReader(new FileReader("/home/dh354099/Documents/onlinetraining/datagenerator/chatbot.yml"));
			Object object = reader.read();
			 Map CONFIG= (Map) object;
				System.out.println(CONFIG);
				return CONFIG;
		} catch (Exception e) {
			e.printStackTrace();
			 return null;
		}

	}

}

