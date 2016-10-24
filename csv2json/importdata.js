//function importdata()
//{


	// set the dimensions of the canvas
	var margin = {top: 20, right: 20, bottom: 70, left: 40},
	width = 600 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;


// set the ranges
var x = d3.scaleBand().rangeRound([0, width]).padding(0.2),
y = d3.scaleLinear().rangeRound([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom");


var yAxis = d3.svg.axis()
.scale(y)
.orient("left");


// add the SVG element
var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
	"translate(" + margin.left + "," + margin.top + ")");

d3.json("C_data.json",function(data){

	x.domain(data.map(function(d) { return d.catogories; }));
	y.domain([0, d3.max(data, function(d) { return d.population; })]);

	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis)
	.selectAll("text")
	.style("text-anchor", "end")
	.attr("dx", "-.8em")
	.attr("dy", "-.55em")
	.attr("transform", "rotate(-90)" );

	svg.append("g")
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 5)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.text("population");

	svg.selectAll("rect")
	.data(data)
	.enter().append("rect")
	.attr("class", "bar")
	.attr("x", function(d) { return x(d.catogories); })
	.attr("width", x.rangeBand())
	.attr("y", function(d) { return y(d.population); })
	.attr("height", function(d) { return height - y(d.population); })
	.attr("fill","#e8d01b");

});
		/*svg.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("width",80)
		.attr("height",function(d){
			return (d.population/1000000)+400;
		})
		.attr("x",function(d,i)
		{
			return i*150;
		})
		.attr("fill","#e8d01b");


	})*/
//}