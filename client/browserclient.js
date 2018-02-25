

    // Create SocketIO instance, connect

	this.strokeActive = false;
this.LEDallblack = true;
this.activeRed = 0;
this.activeGreen = 0;
this.activeBlue = 0;
this.activeLEDSize = 0;
this.blackColor =  rgb2Int(0,0,0);

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
		self.activeSize = self.brushSizes[0];  
		self.strokeActive = false;
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
	  }
	});	
	
    var draw = SVG('drawing').size('100%', '100%')
	var background = draw.rect('100%', '100%').attr({ fill: '#000000' })
	var rect = draw.rect('40', '40').move('50%','50%').fill('#ffffff')
		
	// ---- animation-loop
setInterval(function () {
	if (self.strokeActive && self.activeLEDSize){

		var currentColor = rgb2Int(self.activeRed, self.activeGreen, self.activeBlue);
		
		rect.size(activeLEDSize, activeLEDSize)
        rect.attr({ fill: currentColor })	


	} else {
		clearSVG();
	}
}, 1000 / 30);

function clearSVG(){
	if (self.activeLEDSize == 0){
		rect.size(0,0)
	}	
}
	
function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

/*
var io = require('socket.io-client');

this.host = process.argv[2];
this.strokeActive = false;
this.LEDallblack = true;
this.activeRed = 0;
this.activeGreen = 0;
this.activeBlue = 0;
this.activeLEDSize = 0;
this.blackColor =  rgb2Int(0,0,0);

this.sizeZero     = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];  
this.sizeOne      = ['0','0','0','0','0','0','0','0','0','0','0','1','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];  
this.sizeTwo      = ['0','0','0','0','0','0','0','0','0','0','0','2','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];  
this.sizeThree    = ['0','0','0','0','0','0','0','0','0','0','0','3','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];  
this.sizeFour     = ['0','0','0','0','0','0','0','0','0','0','0','3','3','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];  
this.sizeFive     = ['0','0','0','0','0','0','0','0','0','0','1','3','3','1','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'];  
this.sizeSix      = ['0','0','0','1','1','0','0','0','0','0','2','3','3','2','0','0','0','0','0','1','1','0','0','0','0','0','0','0','0','0','0','0'];  
this.sizeSeven    = ['0','0','1','1','1','1','0','0','0','1','3','3','3','3','1','0','0','0','1','2','2','1','0','0','0','0','0','1','1','0','0','0'];  
this.sizeEight    = ['0','0','1','2','2','1','0','0','0','2','3','3','3','3','2','0','0','0','2','3','3','2','0','0','0','0','1','2','2','1','0','0'];  
this.sizeNine     = ['0','0','2','3','3','2','0','0','1','3','3','3','3','3','3','1','0','1','3','3','3','3','1','0','0','0','2','3','3','2','0','0'];  
this.sizeTen      = ['0','1','3','3','3','3','1','0','2','3','3','3','3','3','3','2','0','2','3','3','3','3','2','0','0','1','2','3','3','2','1','0'];  
this.sizeEleven   = ['1','3','3','3','3','3','3','1','3','3','3','3','3','3','3','3','1','3','3','3','3','3','3','1','0','2','3','3','3','3','2','0'];  
this.sizeTwelve   = ['2','3','3','3','3','3','3','2','3','3','3','3','3','3','3','3','2','3','3','3','3','3','3','2','1','2','3','3','3','3','2','1'];  
this.sizeThirteen = ['3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','2','3','3','3','3','3','3','2','2','2','3','3','3','3','2','2'];  
this.sizeFourteen = ['3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','2','3','3','3','3','3','3','2'];  
this.sizeFifteen  = ['3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3','3'];  

this.brushSizes = [this.sizeZero,this.sizeOne, this.sizeTwo, this.sizeThree,this.sizeFour, this.sizeFive, this.sizeSix, this.sizeSeven, this.sizeEight, this.sizeNine, this.sizeTen, this.sizeEleven, this.sizeTwelve, this.sizeThirteen, this.sizeFourteen, this.sizeFifteen];

this.activeSize = this.brushSizes[0];

var self = this;

if(io){
	if(!this.host){	
		this.socket = io.connect('http://192.168.0.220:3002');
	} else {	
		this.socket = io.connect(self.host);
	}
	self.joinedRoom = 'theRoom';
	this.socket.on('connect', function (socket) {
		console.log('Connected!');
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
		self.activeSize = self.brushSizes[0];  
		self.strokeActive = false;
	  });

	/*
	  this.socket.on('newPoints', event => {
		if(!event[0] || event[0].stroke.owner === self.socket.owner) return;
		//console.log("New points");
	  });
	  
	
	  this.socket.on('newLEDSize', event => {
		  
		//console.log("LEDSize changed: ", event.ledsize);
		  if (event.ledsize != self.activeLEDSize){
		      self.activeLEDSize = event.ledsize;
		      self.activeSize = self.brushSizes[event.ledsize];	 
		  }
	  });	

}

var ws281x = require('rpi-ws281x-native');

var NUM_LEDS = 32,
pixelData = new Uint32Array(NUM_LEDS);
blackpixelData = new Uint32Array(NUM_LEDS);
for (var i = 0; i < NUM_LEDS; i++) {
			blackpixelData[i] = rgb2Int(0,0,0);
}
ws281x.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});

// ---- animation-loop
setInterval(function () {
	if (self.strokeActive && self.activeSize){
		var lowModifier = 4;
		var mediumModifier = 2;
		var currentColor = rgb2Int(self.activeRed,self.activeGreen,self.activeBlue);
		var currentColorLow = rgb2Int(Math.round(self.activeRed / lowModifier), Math.round(self.activeGreen / lowModifier), Math.round(self.activeBlue / lowModifier)); 
		var currentColorMedium = rgb2Int(Math.round(self.activeRed / mediumModifier), Math.round(self.activeGreen / mediumModifier), Math.round(self.activeBlue / mediumModifier)); 
		for (var i = 0; i < NUM_LEDS; i++) {
			switch (self.activeSize[i]){
				case '0':
					pixelData[NUM_LEDS - 1 - i] = self.blackColor;
					break;
				case '1':
					pixelData[NUM_LEDS - 1 - i] = currentColorLow;
					break;					
				case '2':
					pixelData[NUM_LEDS - 1 - i] = currentColorMedium;
					break;					
				case '3':
					pixelData[NUM_LEDS - 1 - i] = currentColor;
					break;
				default:
					//console.log("No size data available");
					//pixelData[i] = colorwheel((offset + i) % 256);
			}
		}
		ws281x.render(pixelData);
		if(self.LEDallblack){
			self.LEDallblack = false;
		}
	} else {
		clearLEDs();
	}
}, 1000 / 30);

function clearLEDs(){
	if (!self.LEDallblack){
		ws281x.render(blackpixelData);
		self.LEDallblack = true;
	}	
}

function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

*/