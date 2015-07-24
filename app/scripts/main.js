var d3 = require('d3');
var svg = d3.select("svg")
var io = require('socket.io-client');
var socket = io('http://tuneset.com:3000');
var leaf = require('./lib/leaf.js');
socket.on('all', function(data){
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
