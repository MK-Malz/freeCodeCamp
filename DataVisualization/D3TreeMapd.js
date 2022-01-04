const GAME_DATA =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

d3.json(GAME_DATA).get(function (error, d) {
  let data = d;
  let colorSet = d3.scaleOrdinal().range(d3.schemeCategory20c);

  const padding = 50;
  const width = 1200 - padding - padding;
  const height = 800 - padding - padding;

  const treemap = d3.treemap().size([width, height]);

  let tip = d3
    .tip()
    .attr("class", "d3-tip")
    .attr("id", "tooltip")
    .style("opacity", 0)
    .style("background-color", "white")
    .style("border", "solid")
    .html((d) => {
      return (
        "<p>" +
        "Name: " +
        d.data.name +
        "<br>" +
        "Category: " +
        d.data.category +
        "<br>" +
        "Value: " +
        d.data.value +
        "<br>" +
        "</p>"
      );
    });

  const svg = d3
    .select("#dataviz")
    .append("svg")
    .attr("width", width + padding)
    .attr("height", height + padding)
    .style("left", padding + "px")
    .style("top", padding + "px");

  svg.call(tip);

  const root = d3.hierarchy(data, (d) => d.children).sum((d) => d.value);

  const tree = treemap(root);

  const dataBox = svg
    .datum(root)
    .selectAll("g")
    .data(tree.leaves())
    .enter()
    .append("g")
    .attr("class", "dataBox")
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.data.value)
    .attr("transform", (d) => "translate(" + d.x0 + "," + d.y0 + ")")
    .on("mouseover.attr", (d) => {
      tip.attr("data-value", d.value);
    })
    .on("mouseover.tip", tip.show)
    .on("mouseout", tip.hide);

  dataBox
    .append("rect")
    .attr("class", "tile")
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.data.value)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", (d) => colorSet(d.parent.data.name))
    .attr("stroke", "black")
    .attr("stroke-width", "1");

  dataBox
    .append("text")
    .attr("class", "dataBox-text")
    .selectAll("tspan")
    .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
    .enter()
    .append("tspan")
    .attr("x", 4)
    .attr("y", function (d, i) {
      return 13 + i * 10;
    })
    .text(function (d) {
      return d;
    });

  let categories = root.leaves().map((dataBoxes) => dataBoxes.data.category);

  categories = categories.filter(function (category, index, self) {
    return self.indexOf(category) === index;
  });

  let legend = d3
    .select("#legend")
    .append("svg")
    .attr("id", "legend")
    .attr("width", 500);

  let colorLegend = legend
    .append("g")
    .attr("transform", "translate(60, 0)")
    .selectAll("g")
    .data(categories)
    .enter()
    .append("g")
    .attr(
      "transform",
      (d, i) => `translate(${(i % 4) * 126}, 
        ${Math.floor(i / 4) * 15 + 10 * Math.floor(i / 4)})`
    );

  colorLegend
    .append("rect")
    .attr("width", 400)
    .attr("height", 15)
    .attr("class", "legend-item")
    .attr("fill", (d) => colorSet(d));

  colorLegend
    .append("text")
    .attr("x", 20)
    .attr("y", 10)
    .text(function (d) {
      return d;
    });
});
