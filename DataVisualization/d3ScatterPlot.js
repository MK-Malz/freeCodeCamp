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
      return new Date(Date.UTC(1970, 0, 1, 0, parsedTime[0], parsedTime[1]));
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
      .domain([Math.max(...times), Math.min(...times)])
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
        return yScale(
          new Date(Date.UTC(1970, 0, 1, 0, parsedTime[0], parsedTime[1]))
        );
      })
      .attr("r", 5)
      .attr("class", "dot")
      .attr("data-xvalue", function (d) {
        return d.Year;
      })
      .attr("data-yvalue", function (d) {
        return d.Time;
      })
      .style("fill", function (d) {
        if (d.Doping !== "") {
          return "blue";
        } else {
          return "orange";
        }
      })
      .on("mouseover", function (d) {
        tooltip
          .style("left", d3.pageX - 50 + "px")
          .style("top", d3.pageY - 70 + "px")
          .style("display", "flex")
          .style("border-style", "solid")
          .style("text-align", "center")
          .style("align-items", "center")
          .style("justify-content", "center")
          .attr("data-year", d.path[0]["__data__"].Year)
          .html(
            "<p>" +
              "<b>Time:</b> " +
              d.path[0]["__data__"].Time +
              "<br>" +
              "<b>Place:</b> " +
              d.path[0]["__data__"].Place +
              "<br>" +
              "<b>Seconds:</b> " +
              d.path[0]["__data__"].Seconds +
              "<br>" +
              "<b>Name:</b> " +
              d.path[0]["__data__"].Name +
              "<br>" +
              "<b>Year:</b> " +
              d.path[0]["__data__"].Year +
              "<br>" +
              "<b>Nationality:</b> " +
              d.path[0]["__data__"].Nationality +
              "<br>" +
              "<b>Doping:</b> " +
              d.path[0]["__data__"].Doping +
              "<br>" +
              "<b>URL:</b> <a href='" +
              d.path[0]["__data__"].URL +
              "'>Wiki</a><br>" +
              "</p>"
          );
      })
      .on("mouseout", function (d) {
        tooltip.style("display", "none");
      });

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
