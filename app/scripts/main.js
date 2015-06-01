var d3 = require('d3');
var svg = d3.select("svg")
var io = require('socket.io-client');
var socket = io('http://tuneset.com:3000');
var leaf = require('./lib/leaf.js');
socket.on('all', function(data){
    console.log('all', data);
    leaf.drawFlower(data, 0);
});
socket.on('log', function(data) {
    console.log('log', data);
});
socket.on('mail', function(data){
    leaf.drawLeaf(data);
    console.log('event', data);
});
socket.on('disconnect', function(){});
var mails = [
    {
        size: 0.2
    },
    {
        size: 1.1
    },
    {
        size: 0.4
    },
    {
        size: 1.05
    },
    {
        size: 0.8
    },
    {
        size: 1
    },
    {
        size: 1
    },
]
            

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
var makeLeaf = function(index, leafD, percent) {
    var fix = 0
    var t = indexes[index] || 0.6;
    var opacity = opacities[index] || 1;
    opacities[index] = opacity;// - 0.4;
    indexes[index] = t;// + (Math.random()*0.1) ;
    var group;
    if (groups[index]) {
        group = groups[index];
    }
    else { 
        group = g.append('g');
        var rotate = 140;//percent * 140;
        group.attr('transform', 'rotate(' + (51*index) + ', '+rotate+', 535)');
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
        .duration(2000)
        .attr("stroke-dashoffset", 0)
}

var kick = function(index, data, percent) {
    makeLeaf(Math.floor(index/6), data, percent);
}
/*
for (var i = 0; i < 42; i++) {
    (function() {
        var myData = JSON.parse(JSON.stringify(leafData));
        var size = 1 - mails[(Math.floor(i/6))].size;// * 0.4);
        var yCorrection = (myData[0].y - (myData[0].y * size));
        for (var j = 0; j < myData.length; j++) {
            if (j !== 0 && j !== 4){
                if (myData[j].y == 0) {
                    myData[j].y = myData[j].y - (size * 100)
                }
                else {
                    myData[j].y = myData[j].y - (50 * size)
                    if (myData[j].x === 0) {
                        myData[j].x = myData[j].x - (35 * size)
                    }
                    else {
                        myData[j].x = myData[j].x + (35 * size)
                    }
                }
            }
        }
        (function(a, data, percent) {
            setTimeout(function() {kick(a, data, percent)}, i * 700)
        })(i, JSON.parse(JSON.stringify(myData)), size)
    })()
}
*/
