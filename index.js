
/*----------  Serial COnnection  ----------*/
const SerialPort = require('serialport');//import paket
const portNumber = process.argv[2];//ambil argumen ke 2 di cli
console.log("port : " + portNumber);//view Port
const morPort = new SerialPort(portNumber, {
  baudRate: 57600
});//buat objek serial morPort

//parser biar ga buffer
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
	delimiter : '\r\n'
});
/*----------  ---------------------- ----------*/
morPort.pipe(parser);//using parser

//event buat summon serial port pakai open
morPort.on('open', ()=>{
	console.log("connected at : " + portNumber);
	let timeOut = 3000;
	setTimeout(()=>{
		//listener ke arduino 1
		morPort.write('1',(err)=>{
			if(err)
				console.log(err);
			else
				console.log("success write 1");
		})
	}, timeOut)
});

//munculkan data parsing
// parser.on('data', (data)=>{
	
// 	let parsingResult = parasingRawData(data," ");
// 	console.log(parsingResult);
// 	console.log(data);

// })


//express and socket io
//-----------------------------------------------------------------------
const express = require('express');//import package express
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);//import package io
const path = require('path')//import package path(default)

app.use(express.static(path.join(__dirname,'www')));
const portListen = 8080;
server.listen(portListen);

let jumlahClient = 0;
io.on('connection', (socket)=>{
	jumlahClient++;
	console.log('New client connected..\n' + 'Total : ' + jumlahClient);

	parser.on('data', (data)=>{
		//calling parsing
		let parsingResult = parasingRawData(data,"*");
		if(parsingResult[0] == "OK"){
			socket.emit('socketData', {datahasil : parsingResult});
		}
		//console.log(parsingResult);
	});

	socket.on('disconnect',()=>{
		jumlahClient--;
		console.log('Client disconnected..\n' + 'Total : ' + jumlahClient);
	});
});


//function untuk parsing
//args 1 = data parsing
//args 2 = pemisah
function parasingRawData(data,delimeter){
	let result;
	result = data.toString().replace(/(\r\n|\n\r)/gm,"").split(delimeter);
	return result;
};



//------------------Declare Variable------------------

// const param = {
// 	head : 'OK',
// 	long_alti : 0, 
//   	temp : 0,
//   	humi : 0,
//   	pres : 0,
//   	windDir : 0,
//   	windVelo : 0,
//   	co2 : 0
// };

// data : function(data){
// 	const getData = this.head + "\t"
// 					+ this.long_alti + "\t"
// 					+ this.temp + "\t"
// 					+ this.humi + "\t"
// 					+ this.pres + "\t"
// 					+ this.windDir + "\t"
// 					+ this.windVelo + "\t"
// 					+ this.co2;
// 	return getData;
// };

//----------------------------------------------------


