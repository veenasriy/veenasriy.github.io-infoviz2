var dataset = [
  { PaymentMethod: ' Cash ', Income: 67800 },
  { PaymentMethod: ' StoreCard ', Income: 56900 },
  { PaymentMethod: ' DebitCard ', Income: 430728 },
  { PaymentMethod: ' Check ', Income: 432138 },
  { PaymentMethod: 'Other', Income: 428295 },
];

function showDonut(dataset) {
  var width = 360;
  var height = 360;
  var radius = Math.min(width, height) / 2;
  var donutWidth = 75;
  var legendRectSize = 18;
  var legendSpacing = 4;

  var color = d3.scale.category20b();

  var svg = d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +
      ',' + (height / 2) + ')');

  var arc = d3.svg.arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);

  var pie = d3.layout.pie()
    .value(function (d) {
      return d.Income;
    })
    .sort(null);

  var tooltip = d3.select('#chart')
    .append('div')
    .attr('class', 'tooltip');

  tooltip.append('div')
    .attr('class', 'PaymentMethod');

  tooltip.append('div')
    .attr('class', 'Income');

  tooltip.append('div')
    .attr('class', 'percent');

  //d3.csv('weekdays.csv', function (error, dataset) {
  dataset.forEach(function (d) {
    d.Income = +d.Income;
    d.enabled = true; // NEW
  });

  var path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d, i) {
      return color(d.data.PaymentMethod);
    }) // UPDATED (removed semicolon)
    .each(function (d) {
      this._current = d;
    }); // NEW

  path.on('mouseover', function (d) {
    var total = d3.sum(dataset.map(function (d) {
      return (d.enabled) ? d.Income : 0; // UPDATED
    }));
    var percent = Math.round(1000 * d.data.Income / total) / 10;
    tooltip.select('.PaymentMethod').html(d.data.PaymentMethod);
    tooltip.select('.Income').html(d.data.Income);
    tooltip.select('.percent').html(percent + '%');
    tooltip.style('display', 'block');
  });

  path.on('mouseout', function () {
    tooltip.style('display', 'none');
  });

  /* OPTIONAL 
path.on('mousemove', function(d) {
  tooltip.style('top', (d3.event.pageY + 10) + 'px')
    .style('left', (d3.event.pageX + 10) + 'px');
});
*/

  var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function (d, i) {
      var height = legendRectSize + legendSpacing;
      var offset = height * color.domain().length / 2;
      var horz = -2 * legendRectSize;
      var vert = i * height - offset;
      return 'translate(' + horz + ',' + vert + ')';
    });

  legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', color)
    .style('stroke', color) // UPDATED (removed semicolon)
    .on('click', function (PaymentMethod) { // NEW
      var rect = d3.select(this); // NEW
      var enabled = true; // NEW
      var totalEnabled = d3.sum(dataset.map(function (d) { // NEW
        return (d.enabled) ? 1 : 0; // NEW
      })); // NEW

      if (rect.attr('class') === 'disabled') { // NEW
        rect.attr('class', ''); // NEW
      } else { // NEW
        if (totalEnabled < 2) return; // NEW
        rect.attr('class', 'disabled'); // NEW
        enabled = false; // NEW
      } // NEW

      pie.value(function (d) { // NEW
        if (d.PaymentMethod === PaymentMethod) d.enabled = enabled; // NEW
        return (d.enabled) ? d.Income : 0; // NEW
      }); // NEW

      path = path.data(pie(dataset)); // NEW

      path.transition() // NEW
        .duration(750) // NEW
        .attrTween('d', function (d) { // NEW
          var interpolate = d3.interpolate(this._current, d); // NEW
          this._current = interpolate(0); // NEW
          return function (t) { // NEW
            return arc(interpolate(t)); // NEW
          }; // NEW
        }); // NEW
    }); // NEW

  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) {
      return d;
    });
}