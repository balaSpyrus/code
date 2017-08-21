package com.test1;

class Description
{
@Override
	public String toString()
	{
		return "Description [color=" + color + ", quantity=" + quantity + "]";
	}
private String color;
private int quantity;

public Description(String color, int quantity)
{
	super();
	this.color = color;
	this.quantity = quantity;
}
public Description(int quantity)
{
	super();
	this.quantity = quantity;
}
public Description(String color)
{
	super();
	this.color = color;
}
public String getColor()
{
	return color;
}
public int getQuantity()
{
	return quantity;
}


	
}
