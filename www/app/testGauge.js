var chart;
var param1 = {
	ketinggian = 0, 
	temps = 0,
	
	graph : {
		ketinggian 	: [], 
		temps 		: []
	},
	setKetinggian : function(data){
		this.ketinggian = parseFloat(data);
	}
	getKetinggian : function(){
		return this.ketinggian;
	},
	setTemps : function(data){
		this.temps = parseFloat(data);
	},
	getTemps : function(){
		return this.temps;
	}
};

var ketinggian, temps;

function gaugeUpdate