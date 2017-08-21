package com.test1;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author BA354098
 *
 */
public class Shape
{

	private static ApplicationContext factory;

	/**
	 * @param args
	 */
	public static void main(String[] args)
	{
		 factory = new ClassPathXmlApplicationContext("spring.xml");
		Poly t=(Poly)factory.getBean("polygon");
		System.out.println(t.draw());
	}

}
