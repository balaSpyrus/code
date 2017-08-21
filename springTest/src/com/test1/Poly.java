package com.test1;

import java.util.List;

class Poly
{
	private int sides;
	private List<Description> descriptions;
	
public List<Description> getDescriptions()
	{
		return descriptions;
	}

	public void setDescriptions(List<Description> descriptions)
	{
		this.descriptions = descriptions;
	}

public int getSides()
	{
		return sides;
	}

	public void setSides(int sides)
	{
		this.sides = sides;
	}


public String draw() {
	String out="";
	
	for(Description d:descriptions)	
		out+=d+"\n";
	
	
	return "polygon with "+getSides()+" sides drawn with descriptions \n"+out;
}



}
