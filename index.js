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
	console.log(data);
})