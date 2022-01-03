//get data
fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
)
  .then((response) => response.json())
  .then((dataset) => {
    let years = dataset.map(function (item) {
      return item.Year;
    });

    /*
    var parsedTime = d.Time.split(':');
      d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
    */

    let times = dataset.map(function (item) {
      let parsedTime = item.Time.split(":");
      return new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
    });

    // creata DataViz
    const w = 1000;
    const h = 500;
    const padding = 100;

    /* ######## Axis Scaling ######### */
    const xScale = d3
      .scaleLinear()
      .domain([Math.min(...years), Math.max(...years)])
      .range([padding, w - padding]);

    const yScale = d3
      .scaleTime()
      .domain([Math.min(...times), Math.max(...times)])
      .range([h - padding, padding]);

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    var tooltip = d3.select("body").append("div").attr("id", "tooltip");

    // ###### data entry ###########

    svg
      .selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(d.Year);
      })
      .attr("cy", function (d) {
        let parsedTime = d.Time.split(":");
        return yScale(new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]));
      })
      .attr("r", 5);

    /*
    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return xScale(dates[i]);
      })
      .attr("y", function (d) {
        return yScale(d[1] - padding);
      })
      .attr("width", 1)
      .attr("height", (d) => (h - padding) - yScale(d[1]))
      .attr("class", "bar")
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .on("mousemove", function(d){
            console.log(d.path[0]["__data__"][0])
            tooltip
              .style("left", d3.pageX - 50 + "px")
              .style("top", d3.pageY - 70 + "px")
              .style("display", "flex")
              .attr("data-date", d.path[0]["__data__"][0])
              .html(d.path[0]["__data__"][0]);
        })
    		.on("mouseout", function(d){ tooltip.style("display", "none");});
      
      */

    var timeFormat = d3.timeFormat("%M:%S");

    const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"));
    const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);

    svg
      .append("g")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis)
      .attr("id", "x-axis");

    svg
      .append("g")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis)
      .attr("id", "y-axis");
  });
