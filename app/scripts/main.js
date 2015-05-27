var d3 = require('d3');
var svg = d3.select("body")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%");

            

var dataset = [ 5 ];
var leafData = [
    {
        x: 141.5, 
        y: 0, 
        type: 'mirrored'
    },
    {
        x: 283, 
        y: 177.42,
        type: 'disconnected'
    }, 
    {
        x: 163.93,
        y: 464,
        type: 'disconnected'
    },
    {
        x: 120.3,
        y: 464,
        type: 'disconnected'
    },
    {
        x: 0,
        y: 177.42,
        type: 'disconnected'
    }
]

var lineFunction = d3.svg.line()
                     .x(function(d,i) { 
                         var x = (i * 10) + (Math.random() * 10);
                         return x;
                     })
                     .y(function(d,i) { return d * Math.random() * 5; })
                     .interpolate("linear");

var straight = d3.svg.line()
                     .interpolate("cardinal-closed")
                     .x(function(d,i) { return d.x; })
                     .y(function(d,i) { return d.y; });
var test = function(d) {
    dataset.push(45);
    d3.select(this)
       .transition()
       .duration(3000)
       .attr('d', lineFunction(dataset))
       .each('end', test)
}

    
var add = function() {
    svg.append("path")
        .attr("d", lineFunction(dataset))
        .attr("stroke", "black")
        .attr("opacity", 0.2)
        .attr('fill', 'rgba(233, 233, 0, 0.4)')
        .attr("stroke-width", 1)
        .attr("fill", "none")
        .transition()
        .attr("d", lineFunction(dataset))
        .each('end', test)
}
//add();
//add(); add(); add(); add();
//

var data = d3.range(10).map(function(i) {
  return {x: i * 9, y: 100 *  (Math.sin(i * 2) + 1) / 2};
  });

var g = svg.append('g');
var makeLeaf = function(index, leaf) {
    var p = g.append("path")
        .data([0.6, 0.2, 0.4, 0.6, 0.8, 1])
        .attr("d", function(d) { console.log('d', d); return straight.tension(d)(leaf)})
        .attr('fill', 'white')
        .style({
            "stroke": d3.interpolateRgb("brown", "steelblue"),
            "transform": "rotate("+(index * 51.3)+"deg)"
        })
        .transition()
        .duration(3000)
        .attrTween('d', pathTween)
        .attr("d", function(d) { console.log('d', d); return straight.tension(0.1)(leaf)})
        .transition()
        .duration(3000)
        .attr("d", function(d) { console.log('d', d); return straight.tension(0.8)(leaf)})
        .attr('fill', 'green')
        .attr('stroke', 'white')
    console.log(p);
}

for (var i = 0; i < 7; i++) {
    var myData = leafData;
    for (var j = 0, jj = myData.length; j < jj; j++) {
        //myData[j].x += 100
    }
    makeLeaf(i, myData);
}
function pathTween() {
        var interpolate = d3.scale.quantile()
                        .domain([0,1])
                                    .range(d3.range(1, data.length + 1));
            return function(t) {
                        return line(data.slice(0, interpolate(t)));
                            };
}
