// set the dimensions and margins of the graph
var margin = { top: 80, right: 25, bottom: 30, left: 40 },
  width = 10000 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json",
  function (data) {  
      
      let dataset = data.monthlyVariance
    
      let years = d3  //x Axis
      .map(dataset, function (d) {
        return d.year;
      })
      .keys();
    
    
    let months = d3    //y-Acis
     .map(dataset, function (d) {
        return d.month;
      })
      .keys();
    
    
    var xAxis = d3.scaleBand().range([0, width]).domain(years).padding(0.05);
    
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xAxis).tickSize(0))


    var yAxis = d3.scaleBand().range([height, 0]).domain(months).padding(0.05);
    
    svg
      .append("g")
      .call(d3.axisLeft(yAxis).tickSize(0))
    
    let myColor = d3
      .scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([1, 100]);
   
    
     var tooltip = d3
      .select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");
    
   
   
    // add the squares
    svg
      .selectAll()
      .data(dataset)
      /*.data(dataset, function (d) {
        return d.year + ":" + d.month;
      })*/
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return xAxis(d.year);
      })
      .attr("y", function (d) {
        return yAxis(d.month);
      })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", xAxis.bandwidth())
      .attr("height", yAxis.bandwidth())
      .style("fill", function (d) {
        return myColor(d.variance);
      })
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", function (d) {
      tooltip.style("opacity", 1);
      d3.select(this).style("stroke", "black").style("opacity", 1);
    })
      .on("mousemove", function (d) {
      tooltip
        .html("The exact value of<br>this cell is: " + d.variance)
        .style("left", d3.mouse(this)[0] + 70 + "px")
        .style("top", d3.mouse(this)[1] + "px");
    })
      .on("mouseleave", function (d) {
      tooltip.style("opacity", 0);
      d3.select(this).style("stroke", "none").style("opacity", 0.8);
    })


    
  }
);    
