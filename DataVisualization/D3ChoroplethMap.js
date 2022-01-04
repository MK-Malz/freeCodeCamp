const US_DATA =
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";
const EDU_DATA =
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";

Promise.all([d3.json(EDU_DATA), d3.json(US_DATA)]).then((data) => {
  const eduDataPoints = data[0];
  const geoData = data[1];
  const padding = 50;
  const width = 1000;
  const height = 400;

  var color = d3
    .scaleLinear()
    .domain([
      d3.min(eduDataPoints, (d) => d.bachelorsOrHigher),
      d3.max(eduDataPoints, (d) => d.bachelorsOrHigher),
    ])
    .range(["Orange", "Blue"]);

  let tip = d3
    .tip()
    .attr("class", "d3-tip")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("background-color", "white")
    .style("border", "solid")
    .html((d) => {
      const labelInfo = eduDataPoints.filter((s) => s.fips == d.id)[0];
      return (
        "<p>" +
        labelInfo.area_name +
        ", " +
        labelInfo.state +
        ": " +
        labelInfo.bachelorsOrHigher +
        "</p>"
      );
    });

  var svg = d3
    .select(".dataViz")
    .append("svg")
    .attr("width", width + padding)
    .attr("height", height + padding)
    .attr("viewBox", "0 0 960 600")
    .style("width", width)
    .style("height", "auto")
    .attr("transform", "translate(" + padding + "," + padding + ")");

  svg.call(tip);

  svg
    .append("g")
    .selectAll("path")
    .data(topojson.feature(geoData, geoData.objects.counties).features)
    .enter()
    .append("path")
    .attr("fill", (d) =>
      color(eduDataPoints.filter((s) => s.fips == d.id)[0].bachelorsOrHigher)
    )
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr(
      "data-fips",
      (d) => eduDataPoints.filter((s) => s.fips == d.id)[0].fips
    )
    .attr(
      "data-education",
      (d) => eduDataPoints.filter((s) => s.fips == d.id)[0].bachelorsOrHigher
    )
    .on("mouseover.attr", (d) => {
      tip
        .attr(
          "data-education",
          eduDataPoints.filter((s) => s.fips == d.id)[0].bachelorsOrHigher
        )
        .style("opacity", 1);
    })
    .on("mouseover.tip", tip.show)
    .on("mouseout", tip.hide);

  var colorLegend = d3
    .legendColor()
    .labelFormat(d3.format(".0f"))
    .scale(color)
    .shapePadding(5)
    .shapeWidth(50)
    .shapeHeight(20)
    .labelOffset(0);

  svg.append("g").attr("transform", "translate(1000, 0)").call(colorLegend);
});
