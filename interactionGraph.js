const svg = d3.select("svg")
const width = +svg.attr("width")
const height = +svg.attr("height")
const outerRadius = height / 2 - 10;
const innerRadius = outerRadius * 0.75;
const tau = 2 * Math.PI;
const color = d3.scaleOrdinal(d3.schemeObservable10);

//아시아 국가별 면적 

const url = "https://raw.githubusercontent.com/haneulsaemi/dva_final/refs/heads/master/asialand.csv"


const data = d3.csv(url)

const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("padding", "4px 8px")
    .style("background", "white")
    .style("border", "1px solid #999")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("pointer-events", "none")
    .style("opacity", 0)



d3.csv(url).then(data => {
    console.log(data)

    data.sort((a, b) => d3.descending(+a.총면적, +b.총면적))
    const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)

    const pie = d3.pie()
    .sort(null)
    .value(d => d.총면적)

    const path = svg.datum(data).selectAll("path")
        .data(pie)
        .join("path")
        .attr("fill", (d, i) => color(i))
        .attr("d", arc)
        .each(function (d, i) {this._current = d; })
        .attr("transform", `translate(${width / 2}, ${height / 2})`)
        .on("mouseover", function (event, d) {
            console.log(d)
            d3.select(this).attr("opacity", 0.5);
            tooltip
                .style("opacity", 1)
                .text(`${d.data.국가별}\n: ${d.data.총면적} km²`)
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 20 + "px")
        })
        .on("mousemove", function (event) {
            tooltip
                .style("left", event.pageX + 10 + "px")
                .style("top", event.pageY - 20 + "px")
        })
        .on("mouseout", function () {
            d3.select(this).attr("opacity", 1);
            tooltip.style("opacity", 0)
        });


})   
