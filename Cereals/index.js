$(document).ready(function() { 

    var $this = $('.lollipopchart');

    var data = [
        {
            Cereal: 'Apple Cinammon ',
            Calories: 110,
        },
        {
            Cereal: 'Crispix ',
            Calories: 90
        },
{
            Cereal: 'All-Bran ',
            Calories: 170,
        },
{
            Cereal: 'Trix ',
            Calories: 190,
        },
{
            Cereal: 'Basic 4 ',
            Calories: 130,
        },
        
        
    ];

    var width = $this.data('width'),
        height = $this.data('height');

    var color = d3.scaleOrdinal()
        .range(["#eb6383", "#fa9191", "#ffe9c5", "#b4f2e1"]);

    data.forEach(function(d) {
        d.total = +d.Calories;
    });

    var margin = {top: 20, right: 20, bottom: 85, left: 20},
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;

    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.9);
    var y = d3.scaleLinear()
              .range([height, 0]);

    x.domain(data.map(function(d) { return d.Cereal; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);

    var svg = d3.select($this[0])
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr('class', 'lollipopchart')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var lollipop = svg.append('g').attr('class', 'lollipop');

    var bars = lollipop
        .append("g")
        .attr('class', 'bars')
    
    bars.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr('fill', function(d, i) {
                return color(i);
            })
            .attr("x", function(d) { return x(d.Cereal); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.Calories); })
            .attr("height", function(d) { return height - y(d.total); });



        var lolliradian = 10;

    var circles = lollipop
        .append("g")
        .attr('class', 'circles');
        
        circles.selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          //.transition()
          //.duration(1000)
            .attr("cx", function(d) { return (x(d.Cereal) + x.bandwidth()/2); })
            .attr("cy", function(d) { return y(d.Calories); })
            .attr("r", lolliradian)
        .attr('fill', function(d, i) {
            return color(i);
        })


    var innercircles = lollipop
        .append("g")
        .attr('class', 'innercircles');
        
        innercircles.selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          //.transition()
          //.duration(1000)
            .attr("cx", function(d) { return (x(d.Cereal) + x.bandwidth()/2); })
            .attr("cy", function(d) { return y(d.Calories); })
            .attr("r", lolliradian-5)
        .attr('fill', '#ffffff')



    lollipop.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    lollipop.append("g")
        .call(d3.axisLeft(y));

});
