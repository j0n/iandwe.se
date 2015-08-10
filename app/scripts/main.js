var d3 = require('d3');
var svg = d3.select("svg")
var io = require('socket.io-client');
var socketUrl = 'http://tuneset.com:3000';
var socket = io(socketUrl);
var leaf = require('./lib/leaf.js');
var input; 
function addPental() {
    var email = input.value;
    var re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = svg[0][0].getBoundingClientRect(),
            offset   = (elemRect.top - bodyRect.top) + (elemRect.height/2);
        scrollTo(document.querySelector('body'), 100 , 300);
        socket.emit('add', email);
        input.value = "";
    }
    else {
        alert('Not a valid email');
    }
}
document.addEventListener('click', function() {
});
function scrollTo(element, to, duration) {
    if (duration < 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}
window.onload = function() {
    input = document.getElementById('email');
    document.getElementById('create-leaf').addEventListener('click', addPental);
    input.addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
            addPental();
        }
    });
}

socket.on('connect', function() {
    console.log('connected');
});
socket.on('all', function(data){
    leaf.drawFlower(data, 0);
});
socket.on('full', function(data){
    alert('The flower is now full, next flower will be released tomorrow');
});
socket.on('mail', function(data){
    console.log('got mail', data);
    leaf.drawLeaf(data);
});
socket.on('disconnect', function(){});
