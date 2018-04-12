const SerialPort = require('serialport');//akses modul serialport
const portNumber = process.argv[2];//akses argumen line ke 2 cli
console.log("Port at : "+ portNumber);//notifikasi port
const morePort = new SerialPort(portNumber, {
	baudRate : 57600//baud rate
});

const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
	delimiter : '\r\n' //pemisah inflix
});

morePort.pipe(parser);
//-------------sesi koneksi ke arduino--------
morePort.on('open', ()=>{
	console.log('connected at : ' + portNumber);
	let timeOut = 3000;
	setTimeout(()=> {
		// body
		morePort.write('1', (err)=>{
			if(err)
				console.log(err);
			else
				console.log("Connected with 1, you now may access the GUI");
		})
	}, timeOut)
});//-----------Sesi selesai--------------------

//-------sesi mengkoneksi dan membuat data dioper ke web---------
const express = require('express');//akses modul ekspress
const app = express(); //akses express
const server = require('http').createServer(app);//membuat akses laman
const io = require('socket.io').listen(server);//akses socket
const path = require('path');

app.use(express.static(path.join(__dirname,'www'))); //di komen masih normal aja sih
const portListen = 7010; //membuat local koneksi dengan 1010
server.listen(portListen);//mendengar

//-------sesi mengimpor data dari arduino-------------
let clientNum = 0;
io.on('connection', (socket)=>{
	clientNum++;
	console.log('A new client just connected..\n' + 
				'Total connected : ' + clientNum);

	parser.on('data', (data)=>{
		let parseResult = parsingRawData(data, "*");
		if (parseResult[0] == "OK"){
			socket.emit('socketData', {datashow : parseResult});//membuat objek untuk menaruh data parsing
		}
	});

	socket.on('disconnect', ()=>{
		clientNum--;
		console.log('Client just disconn..');
	});
});//-------sesi mengimpor data dari arduino selesai-------------

//-------sesi mengkoneksi dan membuat data dioper ke web selesai---------

function parsingRawData(data,delimeter){
	let result;
	result = data.toString().replace(/(\r\n|\n\r)/gm,"").split(delimeter);
	return result;
};