const SerialPort = require('serialport');//import paket
const portNumber = process.argv[2];//ambil argumen ke 2 di cli
console.log("port : " + portNumber);//view port
const port = new SerialPort(portNumber, {
  baudRate: 57600
});//buat objek serial port

//parser biar ga buffer
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
	delimiter : '\r\n'
});

port.pipe(parser);//using parser

//event buat summon serial port pakai open
port.on('open', ()=>{
	console.log("connected at : " + portNumber);
	let timeOut = 3000;
	setTimeout(()=>{
		//listener ke arduino 1
		port.write('1',(err)=>{
			if(err)
				console.log(err);
			else
				console.log("success write 1");
		})
	}, timeOut)
});
//munculkan data parsing
parser.on('data', (data)=>{
	
	let parsingResult = parasingRawData(data,",");
	console.log(parsingResult);
	console.log(data);

})

//express and socket io

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
		let parsingResult = parasingRawData(data,",");
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
	result = data.toString().replace(/(\r\n\|\n\r)/gm,"").split(delimeter);

	return result;
}