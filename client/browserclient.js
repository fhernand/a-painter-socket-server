

// Create SocketIO instance, connect

this.strokeActive = false;
this.LEDallblack = true;
this.activeRed = 0;
this.activeGreen = 0;
this.activeBlue = 0;
this.activeLEDSize = 0;
this.blackColor =  rgbToHex(0,0,0);

var self = this;

self.joinedRoom = 'theRoom';
var socket = io();

socket.connect('http://localhost:3002', {autoConnect: true}); 

// Add a connect listener
socket.on('connect',function() {
  console.log('Client has connected to the server!');
});

this.socket.on('giveOwner', owner => {
	self.socket.owner = owner;
	self.socket.emit('joinRoom', self.joinedRoom);
	console.log('Owner: ', self.socket.owner);
	console.log('Room: ', self.joinedRoom);
});

this.socket.on('joinedRoom', function (roomlog){
	console.log("Joined the Room!");
});	

this.socket.on('newStroke', event => {
	if(event.stroke.owner === self.socket.owner) return;
	//console.log("New stroke");
	this.activeRed = Math.round(event.stroke.color[0] * 255);
	this.activeGreen = Math.round(event.stroke.color[1] * 255);
	this.activeBlue = Math.round(event.stroke.color[2] * 255);
	self.strokeActive = true;
  });

  this.socket.on('endStroke', () => {
	//console.log("End stroke");
	self.activeLEDSize = 0;  
	self.strokeActive = false;
	clearSVG()
  });

// Add a connect listener
socket.on('message',function(data) {
  console.log('Received a message from the server!',data);
});

// Add a disconnect listener
socket.on('disconnect',function() {
  console.log('The client has disconnected!');
});

this.socket.on('newLEDSize', event => {  
  //console.log("LEDSize changed: ", event.ledsize);
  if (event.ledsize != self.activeLEDSize){
	  self.activeLEDSize = event.ledsize;
	var currentColor = rgbToHex(self.activeRed, self.activeGreen, self.activeBlue);
	circle.radius(activeLEDSize * 18)
	circle.fill(currentColor)
	circle.finish()		  
  }
});	

	
function clearSVG(){
	if (self.activeLEDSize == 0){
		circle.size(0)
	}	
}
	
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
