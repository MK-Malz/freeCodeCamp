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
    
      let years = d3  
      .map(dataset, function (d) {
        return d.year;
      })
      .keys();
    
    
    let months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
    
    let variances = d3  
      .map(dataset, function (d) {
        return d.variance;
      })
    .keys();
    
    let maxVariance = Math.max(...variances)
    let minVariance = Math.min(...variances)
    let middleVariance = (maxVariance + minVariance) / 2
    let upperMiddleVariance = (maxVariance + middleVariance) / 2
    let lowerMiddleVariance = (middleVariance + minVariance) / 2
       
    var xAxis = d3.scaleBand().range([0, width]).domain(years).padding(0.05);
    
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xAxis).tickSize(0))
      .attr("id", "x-axis");


   var yAxis = d3.scaleBand().range([height, 0]).domain(months).padding(0.05);
      
    svg
      .append("g")
      .call(d3.axisLeft(yAxis).tickSize(0))
      .attr("id", "y-axis");
    
    let colorRangeValues = d3  
      .map(dataset, function (d) {
        return d.variance;
      })
      .keys();
    
     var tooltip = d3
      .select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("id", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");
    
    
    function getMonat(i) {
       if(i == 1) {
            return "January"
       } else if(i == 2) {
            return "February"
       } else if(i == 3) {
            return "March"
       } else if(i == 4) {
            return "April"
       } else if(i == 5) {
            return "May"
       } else if(i == 6) {
            return "June"
       } else if(i == 7) {
            return "July"
       } else if(i == 8) {
            return "August"
       } else if(i == 9) {
            return "September"
       } else if(i == 10) {
            return "October"
       } else if(i == 11) {
            return "November"
       } else if(i == 12) {
            return "December"
       } 
         
           
    }
   
   
    // add the squares
    svg
      .selectAll()
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return xAxis(d.year);
      })
      .attr("y", function (d) {
        return yAxis(getMonat(d.month));
      })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", xAxis.bandwidth())
      .attr("height", yAxis.bandwidth())
      .attr("class", "cell")
      .attr("data-month", function (d) {
        return d.month-1;
      })
      .attr("data-year", function (d) {
        return d.year;
      })
      .attr("data-temp", function (d) {
        return d.variance;
      })
      .style("fill", function (d) {

        if(d.variance > minVariance && d.variance < lowerMiddleVariance ){
           return "blue"
         } else if(d.variance > lowerMiddleVariance && d.variance < middleVariance){
           return "yellow"
        } else if(d.variance > middleVariance && d.variance < upperMiddleVariance){
           return "orange"
        } else if(d.variance > upperMiddleVariance && d.variance < maxVariance){
           return "red"
        }
     
      })
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .on("mouseover", function (d) {
      tooltip.style("opacity", 1).attr("data-year", d.year)
      d3.select(this).style("stroke", "black").style("opacity", 1);
    })
      .on("mousemove", function (d) {
      tooltip
        .html("Variance in this cell is " + d.variance)
        .style("left", d3.mouse(this)[0] + 70 + "px")
        .style("top", d3.mouse(this)[1] + "px");
    })
      .on("mouseleave", function (d) {
      tooltip.style("opacity", 0);
      d3.select(this).style("stroke", "none").style("opacity", 0.8);
    })


    
  }
);    
