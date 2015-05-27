var d3 = require('d3');
var svg = d3.select("body")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%");

            

var dataset = [ 5 ];
var leafData = [
    {
        x: 163.93,
        y: 464,
        type: 'disconnected'
    },
    {
        x: 283, 
        y: 177.42,
        type: 'disconnected'
    }, 
    {
        x: 141.5, 
        y: 0, 
        type: 'mirrored'
    },
    {
        x: 0,
        y: 177.42,
        type: 'disconnected'
    },
    {
        x: 120.3,
        y: 464,
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
/*
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
*/
//add();
//add(); add(); add(); add();
//

                     /*
var data = d3.range(10).map(function(i) {
  return {x: i * 9, y: 100 *  (Math.sin(i * 2) + 1) / 2};
});
*/

var color = d3.scale.category20();

var g = svg.append('g');
var indexes = [];
var opacities = [];
var groups = [];
var makeLeaf = function(index, leafD) {
    var fix = 0
    var t = indexes[index] || 0.6;
    var opacity = opacities[index] || 1;
    opacities[index] = opacity;// - 0.4;
    indexes[index] = t + (Math.random()*0.9) ;
    var group;
    if (groups[index]) {
        group = groups[index];
    }
    else { 
        group = g.append('g');
        group.attr('transform', 'rotate(' + (51*index) + ', 140, 535)');
        groups[index] = group
    }

    var p = group.append("path")
        .data([t, t, t, t, t])
        .attr("d", function(d) {
            var a = (Math.round(Math.random() * 3)/30) + d;
            return straight.tension(a)(leafD)})
        .style({
            "stroke": 'black',
            "opacity" : opacity
        })
        .attr('fill', 'rgba(0,0,0,0)')
        .attr('stroke-dasharray', function() { return (this.getTotalLength() + fix) +  " " + (this.getTotalLength() + fix); })
        .attr('stroke-dashoffset', function() { return this.getTotalLength() + fix; })
        .transition()
        .duration(3000)

        //.attr("d", function(d) { console.log('d', d); return straight.tension(0.1)(leafD)})
        .attr("stroke-dashoffset", 0)
        //.attr("d", function(d) { console.log('d', d); return straight.tension(2.5)(leaf)})
        /*
        .transition()
        .duration(3000)
        .attr('stroke-dasharray', function() { console.log(this, 2, this.getTotalLength()); return (this.getTotalLength()) +  " " + (this.getTotalLength()); })
        .attr('stroke-dashoffset', function() { return this.getTotalLength(); })
        .transition()
        .duration(3000)
        */
    //cjconsole.log('before', p.node().getTotalLength());
        setTimeout(function() {
    //console.log('yo', p.node().getTotalLength());
        }, 4000)
        //console.log(1,p);
}

var kick = function(index, data) {
    console.log('index', index);
    console.log('data', data[0]);
    makeLeaf(Math.round((index-2)/4), data);
}
for (var i = 0; i < 28; i++) {
    (function() {
        var myData = JSON.parse(JSON.stringify(leafData));
        for (var j = 0,jj = leafData.length; j < jj; j++) {
            //leafData[j].x += 100;
            console.log(j, leafData[j]);
        }
        (function(a, data) {
            setTimeout(function() {kick(a, data)}, i * 1500)
        })(i, JSON.parse(JSON.stringify(leafData)))

    })()
}
function pathTween() {
        var interpolate = d3.scale.quantile()
                        .domain([0,1])
                                    .range(d3.range(1, data.length + 1));
            return function(t) {
                        return line(data.slice(0, interpolate(t)));
                            };
}
