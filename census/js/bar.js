
var svg = d3.select("svg"),
margin = {top: 50, right: 50, bottom: 400, left: 200},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.2),
y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("json/categorywise_population.json", function(error, data) {
	if (error) throw error;
	data.sort(function(a, b) { return b.population - a.population; });
	x.domain(data.map(function(d) { return d.catogories; }));
	y.domain([0, d3.max(data, function(d) { return d.population; })]);

	g.selectAll('text')
	.data(data)
	.enter()
	.append('text')
	.attr("class","tip")
	.text(function (d) {return d.population})
	.attr('x',function(d){return x(d.catogories)+50})
	.attr('y',function(d){return y(d.population)})
	.style("fill","#5b5b5b")
	.style("text-anchor","middle");


	g.append("g")
	.attr("class", "x_axis")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x))
	.selectAll("text")
	.attr("transform", "rotate(-65)")
	.attr("text-anchor","end");


	g.append("g")
	.attr("class", "y_axis")
	.call(d3.axisLeft(y).ticks(10))
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("text-anchor", "end")
	.attr("y", -160)
	.attr("x",-160)
	.attr("dy", "0.71em")
	.text("Population");


	g.selectAll(".bar")
	.data(data)
	.enter()
	.append("rect")
	.attr("class","bar")
	.attr("height",0)
	.attr("y",height)
	.transition().duration(1000)
	.delay(function(d,i){return i*200})
	.attr("class", "bar")		
	.attr("x", function(d) { return x(d.catogories); })
	.attr("y", function(d) { return y(d.population); })
	.attr("width", x.bandwidth())
	.attr("height", function(d) { return height - y(d.population); })
	.style("fill",function(d,i){return 'rgb(255, 187, '+((i*30)+50)+')'});

	});
