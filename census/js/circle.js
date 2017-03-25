
var width = 1300,
height = 600,
radius = Math.min(width, height)/2+80;

var color = d3.scale.ordinal()
.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00","red", "blue", "green", "yellow", "cyan", "orange", "magenta","grey", "darkkhaki", "indigo", "pink", "antiquewhite", "  #6495ED", "#7FFF00","darkblue", "skyblue", "darkgreen", "coral", "violet", "olive", "darkgrey"]);

var arc = d3.svg.arc()
.outerRadius(radius - 60)
.innerRadius(100);



var pie = d3.layout.pie()
.sort(null)
.value(function(d) { return d.Literate; });

var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height+200)
.append("g")
.attr("transform", "translate(" + ((width/2)+120 )+ "," + ((height / 2 )+120)+ ")");

var tooltip = d3.select("body")
.append("div")
.style("position", "absolute")
.style("z-index", "9999")
.style("visibility", "visible")
.style("font-size","20pt")
.style("color","white")
.style("background-color","black")
.style("padding","10px")
.style("border-radius","5px")
.style("font-family","sans-serif")
.style("opacity","0.7");

d3.json("json/agewise_literates.json",function(error, data) {
  if (error) throw error;
  var g = svg.selectAll(".arc")
  .data(pie(data))
  .enter().append("g")
  .attr("class", "arc");
  g.append("path")
  .attr("d", arc)
  .style("fill", function(d) { return color(d.data["Literate"]); })
  .on("mouseover", function(d){return tooltip.style("visibility", "visible"),tooltip.text(d.data["Age-group"]);})
  .on("mousemove", function(){return tooltip.style("top",
    (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
  .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

  var legend=d3.select("svg").append('g')
  .attr('class','legend')
  .selectAll('rect')
  .data(pie(data))
  .enter()
  .append('rect')
  .attr('x',80)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill",function(d){return color(d.data.Literate);})
  .attr('y',function(d,i){return 25*(i+1);})

  d3.select("svg").select(".legend")
  .selectAll('text')
  .data(pie(data))
  .enter()
  .append('text')
  .attr('x',100)
  .attr('y',function(d,i){return 25*(i+1.3);})
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .style("fill","#3c3c3d")
  .style("font-size","18px")
  .text(function(d) { return " - population : "+d.data.Literate+" Age : "+d.data["Age-group"]; });
});

