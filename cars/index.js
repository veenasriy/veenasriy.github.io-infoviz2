var cars = [{
    "name": "chevelle",
        "manufacturer": "chevrolet",
        "weight": 3504,
        "acceleration": 12
}, {
    "name": "skylark 32",
        "manufacturer": "buick",
        "weight": 3693,
        "acceleration": 11.5
}, {
     "name": "satellite",
        "manufacturer": "plymouth",
        "weight": 3436,
        "acceleration": 11
}, {
     "name": "rebel sst",
        "manufacturer": "amc",
        "weight": 3433,
        "acceleration": 13
}, {
     "name": "torino",
        "manufacturer": "ford",
        "weight": 4142,
        "acceleration": 17
}, 
 {
     "name": "challenger",
        "manufacturer": "dodge",
        "weight": 4034,
        "acceleration": 11
},
 {
     "name": "mustang",
        "manufacturer": "ford",
        "weight": 3353,
        "acceleration": 10
},
 {
     "name": "torino",
        "manufacturer": "ford",
        "weight": 3563,
        "acceleration": 8
},
 {
     "name": "duster",
        "manufacturer": "plymouth",
        "weight": 3609,
        "acceleration": 10.5
},
 {
     "name": "marvek",
        "manufacturer": "ford",
        "weight": 3761,
        "acceleration": 9.5
},
 {
     "name": "catalina",
        "manufacturer": "pontaic",
        "weight": 4464,
        "acceleration": 11.5
},
 {
     "name": "galaxy",
        "manufacturer": "ford",
        "weight": 4154,
        "acceleration": 13.5
},
 {
     "name": "vega",
        "manufacturer": "chevrolet",
        "weight": 2408,
        "acceleration": 19
},
 {
     "name": "capri",
        "manufacturer": "mercury",
        "weight": 2220,
        "acceleration": 14
},
 {
     "name": "matador",
        "manufacturer": "amc",
        "weight": 3288,
        "acceleration": 15.5
},
{
    "name": "corona mark",
        "manufacturer": "toyota",
        "weight": 3345,
        "acceleration": 11
}];



function showScatterPlot(data) {
    // just to have some space around items. 
    var margins = {
        "left": 40,
            "right": 30,
            "top": 30,
            "bottom": 30
    };
    
    var width = 800;
    var height = 500;
    
    // this will be our colour scale. An Ordinal scale.
    var colors = d3.scale.category20();

    // we add the SVG component to the scatter-load div
    var svg = d3.select("#a1-cars").append("svg").attr("width", width).attr("height", height).append("g")
        .attr("transform", "translate(" + margins.left + "," + margins.top + ")");
    var x = d3.scale.linear()
        .domain(d3.extent(data, function (d) {
        return d.weight;
    }))
        .range([0, width - margins.left - margins.right]);
 
    var y = d3.scale.linear()
        .domain(d3.extent(data, function (d) {
        return d.acceleration;
    }))
    .range([height - margins.top - margins.bottom, 0]);
    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")");
    svg.append("g").attr("class", "y axis");

    //  X axis label. Nothing too special to see here.
    svg.append("text")
        .attr("fill", "	#000000")
        .attr("text-anchor", "end")
        .attr("x", width / 2)
        .attr("y", height - 35)
        .text("Weight of cars");


    //  x and y axes. 
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
    var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);

    //  append to svg  
    svg.selectAll("g.y.axis").call(yAxis);
    svg.selectAll("g.x.axis").call(xAxis);

    // data
    var cars = svg.selectAll("g.node").data(data, function (d) {
        return d.name;
    });

    // SVG group 
    
    var carsGroup = cars.enter().append("g").attr("class", "node")
    
    .attr('transform', function (d) {
        return "translate(" + x(d.weight) + "," + y(d.acceleration) + ")";
    });

    //  type of plot scatter
    carsGroup.append("circle")
        .attr("r", 5)
        .attr("class", "dot")
        .style("fill", function (d) { 
            return colors(d.manufacturer);
    });
    carsGroup.append("text")
        .style("text-anchor", "middle")
        .attr("dy", -10)
        .text(function (d) {
            return d.name;
    });
}

