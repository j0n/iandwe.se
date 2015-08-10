var d3      = require('d3');
var straight = d3.svg.line()
                     .interpolate("cardinal-closed")
                     .x(function(d,i) { return d.x; })
                     .y(function(d,i) { return d.y; });

var svg = d3.select("svg")
var g = svg.append('g');
var push = 460;
var rotate = push + 140;
var groups =[];
var amountOfLines = 6;
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
module.exports = {
    debug: function() {
        this.drawFlower(leafData, 0);
    },
    drawFlower: function(leafs, leafIndex) {
        if (typeof leafs[leafIndex] !== 'undefined') {
            this.drawLeaf(leafs[leafIndex], function done() {
                this.drawFlower(leafs, leafIndex+1);
            }.bind(this));
        }
    },
    drawLeaf: function(data, done) {
                  var serverData = data.leafData; 
        var index = data.index;
        for (var i = 0; i < data.leafData.length; i++) {
            var myData = JSON.parse(JSON.stringify(leafData));
            var size = 1 - data.value;
            var yCorrection = (myData[0].y - (myData[0].y * size));
            //data[j].rand = data.leafData[j];
            for (var j = 0; j < myData.length; j++) {
                myData[j].x += push;
                if (j !== 0 && j !== 4){
                    if (myData[j].y == 0) {
                        myData[j].y = myData[j].y - (size * 100)
                    }
                    else {
                        myData[j].y = myData[j].y - (50 * size)
                        if (myData[j].x === push) {
                            myData[j].x = myData[j].x - (35 * size)
                        }
                        else {
                            myData[j].x = myData[j].x + (35 * size)
                        }
                    }
                }
            }
            (function(i, data, rand) {
                setTimeout(function() {
                    this._makeLeaf(index, data, i, rand);
                    if (i === (serverData.length -3)) {
                        if (done) {
                            done();
                        }
                    }
                }.bind(this), i * 300)
            }.bind(this))(i, JSON.parse(JSON.stringify(myData)), data.leafData[i])
        }
    },
    _makeLeaf: function(index, leafD, leafIndex, rand) {
        var fix = 0
        var t =  0.6;
        var group;
        if (groups[index]) {
            group = groups[index];
        }
        else { 
            group = g.append('g');
            group.attr('transform', 'rotate(' + (51*index) + ', '+rotate+', 535)');
            groups[index] = group
        }

        var p = group.append("path")
            .data([t, t, t, t, t])
            .attr("d", function(d, a) {

                var a = (Math.round(Math.random() * 50)/30) + d;
                return straight.tension(d + rand)(leafD)})
            .style({
                "stroke": 'rgba(0,0,0,'+(1-(leafIndex/8))+')'
            })
            .attr('fill', 'none')
            .attr('stroke-dasharray', function() { return (this.getTotalLength() + fix) +  " " + (this.getTotalLength() + fix); })
            .attr('stroke-dashoffset', function() { return this.getTotalLength() + fix; })
            .transition()
            .duration(2000)
            .attr("stroke-dashoffset", 0)
    }
}
