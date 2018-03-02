function update(){
	const socket = io.connect();

	socket.on('socketData', (data)=>{
		console.log(data);

		document.getElementById("receiveData").innerHTML  = data.datahasil;
	});
}