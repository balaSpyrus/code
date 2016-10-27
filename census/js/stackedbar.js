var margin={top:70, bottom:210, left:150, right:50},
width = 1560 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
.rangeRoundBands([0, width], .3);

var y = d3.scale.linear()
.rangeRound([height, 0]);

var color = d3.scale.ordinal().range(["#02bfe5","#ff2151"]);

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom");

var yAxis = d3.svg.axis()
.scale(y)
.orient("left");



var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("json/state_gender_wise_graduates.json",  function( data) {

 color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Area"; }));

 data.forEach(function(d) {
   var y0 = 0;
   d.Population = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
   d.total = d.Population[d.Population.length - 1].y1;
 });

 data.sort(function(a, b) { return b.total - a.total; });

 x.domain(data.map(function(d) { return d.Area; }));
 y.domain([0, d3.max(data, function(d) { return d.total; })]);

 var formatTime = d3.time.format("%e %B");

 svg.append("g")
 .attr("class", "x_axis")
 .attr("transform", "translate(0," + height + ")")
 .call(xAxis)
 .selectAll("text")
 .attr("y", 0)
 .attr("x" ,9)
 .attr("transform", "rotate(65)")
 .style("text-anchor", "start");

 svg.append("g")
 .attr("class", "y_axis")
 .call(yAxis)
 .append("text")
 .attr("transform", "rotate(-90)")
 .attr("y", -120)
 .attr("dy", "1em")
 .style("text-anchor", "end")
 .text("Population")
 .style("fill","grey")
 .style("font-size","16pt");

 var state = svg.selectAll(".Area")
 .data(data)
 .enter().append("g")
 .attr("class", "g")
 .attr("transform", function(d) { return "translate(" + x(d.Area) + ",0)"; });

 state.selectAll("rect")
 .data(function(d) { return d.Population; })
 .enter().append("rect")
 .on("mouseover", function() { tooltip.style("visibility","visible"); })
 .on("mouseout", function() { tooltip.style("visibility", "hidden"); })
 .on("mousemove", function(d) {
  var xPosition = 900;
  var yPosition = 0;
  tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
  tooltip.select("text").text(d.y1-d.y0);
})
 .attr("height",0)
 .attr("y",height)
 .transition().duration(2000)
 .delay(function(d,i){return i*500})
 .attr("width", x.rangeBand())
 .attr("y", function(d) { return y(d.y1); })
 .attr("height", function(d) { return y(d.y0) - y(d.y1); })
 .style("fill", function(d) { return color(d.name); })  
 ;

 var legend = svg.selectAll(".legend")
 .data(color.domain().slice().reverse())
 .enter().append("g")
 .attr("class", "legend")
 .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

 legend.append("rect")
 .attr("x", width - 18)
 .attr("width", 18)
 .attr("height", 18)
 .style("fill", color);

 legend.append("text")
 .attr("x", width - 24)
 .attr("y", 9)
 .attr("dy", ".35em")
 .style("text-anchor", "end")
 .style("fill","grey")
 .style("font-size","20px")
 .text(function(d) { return d; });
})

// Prep the tooltip bits, initial display is hidden
var tooltip = svg.append("g")
.attr("class", "tooltip")
.style("visibility", "hidden")
.style("z-index","9999")
.style("position","absolute");

tooltip.append("rect")
.attr("width", 160)
.attr("height", 60)
.attr("fill", "black")
.style("opacity", 0.5);

tooltip.append("text")
.attr("x", 15)
.attr("dy", "1.2em")
.style("text-anchor", "start")
.attr("font-size", "32px")
.attr("font-weight", "bold")
.attr("fill","white");