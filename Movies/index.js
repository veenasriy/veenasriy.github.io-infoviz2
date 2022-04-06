// chart data
var films = [
    {
        "name": "That Naughty Girl",
        "length": 77,
        "Popularity": 37,
    },
    {
        "name": "War & Peace",
        "length": 360,
        "Popularity": 50,
    },
    {
        "name": "Guys & Dolls",
        "length": 150,
        "Popularity": 70,
    },
    {
        "name": "Subway",
        "length": 104,
        "Popularity": 6,
    },
    {
        "name": "Posse",
        "length": 94,
        "Popularity": 76,
    },
    {
        "name": "Cyrano De Bergerac",
        "length": 138,
        "Popularity": 86,
    },
    {
        "name": "Greatest Story Ever Told, The",
        "length": 199,
        "Popularity": 26,
    },
    {
        "name": "National Enquirer, The Untold Story",
        "length": 40,
        "Popularity": 65,
    },
    {
        "name": "wild at heart",
        "length": 125,
        "Popularity": 6,
    },
    {
        "name": "Adventures of Rex & Rinty, The",
        "length": 234,
        "Popularity": 87,
    }
];



function renderLineChart(films) {
    // enviornment setup

    var svgConfig = {
        id: "mySvg",
        width: 600,
        height: 300,
        margin: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        }
    };

    // drawing
    // append svg element
    var bodySelection = d3.select("body");

    var svgSelection = bodySelection.append("svg")
        .attr("id", svgConfig.id)
        .attr("width", svgConfig.width)
        .attr("height", svgConfig.height);

    // create x scale
    xScale = d3.scale.linear()
        .range([svgConfig.margin.left, svgConfig.width - svgConfig.margin.right])
        .domain([d3.min(films, function (d) { return +d.length; }), d3.max(films, function (d) { return +d.length; })]);

    // create y scale
    yScale = d3.scale.linear()
        .range([svgConfig.height - svgConfig.margin.top, svgConfig.margin.bottom])
        .domain([d3.min(films, function (d) { return +d.Popularity; }), d3.max(films, function (d) { return +d.Popularity; })]);

    //let's create the axes using the scales
    xAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(d3.format("d"))
        .innerTickSize(-svgConfig.height);

    yAxis = d3.svg.axis()
        .orient("left")
        .scale(yScale)
        .innerTickSize(-svgConfig.width);

    // add xaxis to chart - it will add it to top of the svg
    svgSelection.append("svg:g")
        .attr("id", "xAxis")
        .attr("class", "axis")
        .call(xAxis);

    // The X axis is drawn but it has some issues. First, we need to position it vertically downwards using transform property
    d3.select("#xAxis")
        .attr("transform", "translate(0," + (svgConfig.height - svgConfig.margin.bottom) + ")");

    // add yaxis to chart, but this will not add it to correct oorientation
    svgSelection.append("svg:g")
        .attr("id", "yAxis")
        .attr("class", "axis")
        .call(yAxis);

    // apply transform logic to bring it to correct place
    d3.select("#yAxis")
        .attr("transform", "translate(" + (svgConfig.margin.left) + ",0)")

    // now lets generate line
    var lineSelection = d3.svg.line()
        .x(function (d) {
            return xScale(d.length);
        })
        .y(function (d) {
            return yScale(d.Popularity)
        });

    // append line to svg
    svgSelection.append("svg:path")
        .attr('d', lineSelection(films))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

}
