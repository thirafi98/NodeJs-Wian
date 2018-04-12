var temperature = 0, 
kelembaban = 0,
arahAngin = 0,
heights = 0,
tekanan = 0,
ehwat = 0;



//parameter buat map
var param = {
        lintang 	: -6.9739024 , //Bandung
        bujur 		: 107.62990522121004, //Bandung
        setLintang : function(data){
        	this.lintang = parseFloat(data);
        },
        setBujur : function(data){
        	this.bujur = parseFloat(data);
        },
        getLintang : function(){
        	return this.lintang;
        },
        getBujur : function(){
        	return this.bujur  ;
        }
    };
    
    var lineCoordinatesArray = [];

    var gaugeArahAngin = new RadialGauge({
    	renderTo: 'gaugeArahAngin',
    	width : 250,
    	height : 250,
    	minValue: 0,
    	maxValue: 360,
    	majorTicks: [
    	"N",
    	"NE",
    	"E",
    	"SE",
    	"S",
    	"SW",
    	"W",
    	"NW",
    	"N"
    	],
    	minorTicks: 22,
    	ticksAngle: 360,
    	startAngle: 180,
    	strokeTicks: false,
    	highlights: false,
    	colorPlate: "#a33",
    	colorMajorTicks: "#f5f5f5",
    	colorMinorTicks: "#ddd",
    	colorNumbers: "#ccc",
    	colorNeedle: "rgba(240, 128, 128, 1)",
    	colorNeedleEnd: "rgba(255, 160, 122, .9)",
    	valueBox: false,
    	valueTextShadow: false,
    	colorCircleInner: "#fff",
    	colorNeedleCircleOuter: "#ccc",
    	needleCircleSize: 15,
    	needleCircleOuter: false,
    	animationRule: "linear",
    	needleType: "line",
    	needleStart: 75,
    	needleEnd: 99,
    	needleWidth: 3,
    	borders: true,
    	borderInnerWidth: 0,
    	borderMiddleWidth: 0,
    	borderOuterWidth: 10,
    	colorBorderOuter: "#ccc",
    	colorBorderOuterEnd: "#ccc",
    	colorNeedleShadowDown: "#222",
    	borderShadowWidth: 0,
    	animationTarget: "plate",
    	animationDuration: 1500,
    	value: 0,
    	animateOnInit: true
    }).draw();
    gaugeArahAngin.draw();

var gaugeTekanan = new LinearGauge({
    	renderTo: 'gaugeTekanan',
    	// chartType : 'gauge',
    	width: 500,
    	height: 150,
   	 	minValue: 0,
    	maxValue: 300,
    	majorTicks: ['0', '100', '200', '300'],

    	minorTicks: 10,
    	ticksAngle: 180,
    	startAngle: 90,
    	highlights: [
        {
            "from": 200,
            "to": 300,
            "color": "rgba(200, 50, 50, .75)"
        	}
    	],	
    	animationRule: 'elastic',
    	// highlights: false,
    	minorTicks: 10,
    	strokeTicks: true,
    	colorPlate: "#fff",
    	borderShadowWidth: 0,
    	borders: false,
    	barBeginCircle: false,
    	tickSide: "left",
    	numberSide: "left",
    	needleSide: "left",
    	needleType: "line",
    	needleWidth: 3,
    	colorNeedle: "#222",
    	colorNeedleEnd: "#222",
    	animationDuration: 150,
    	animationRule: "linear",
    	animationTarget: "plate",
    	barWidth: 5,
    	ticksWidth: 50,
    	ticksWidthMinor: 15
    }).draw();
gaugeTekanan.draw();

var pointCount = 20;
var i, r;

var x = [];
var y = [];
var z = [];
var c = [];

var stage = Sprite3D.stage(document.querySelector("#sikap"));
            // "verbose" version
var box = Sprite3D.box( 421, 200, 5, "cube" ); //lebar tinggi panjang

//sesi mengimpor dari index.js ke index.html
function update(){
    	const socket = io.connect();

    	socket.on('socketData', (data)=>{
    		console.log(data);

    		document.getElementById("receiveData").innerHTML = data.datashow;

    		$( "#head" ).html(data.datashow[0]) ;
    		$( "#ketinggian" ).html(data.datashow[1]) ;
    		$( "#temperature" ).html(data.datashow[2]) ;
    		$( "#humidity" ).html(data.datashow[3]) ;
    		$( "#pressure" ).html(data.datashow[4]) ;
    		$( "#latitude" ).html(data.datashow[5]) ;
    		$( "#longitude" ).html(data.datashow[6]) ;
    		$( "#co2" ).html(data.datashow[7]) ;
    		$( "#x" ).html(data.datashow[8]) ;
    		$( "#y" ).html(data.datashow[9]) ;
    		$( "#z" ).html(data.datashow[10]) ;
    		$( "#IMG" ).html(data.datashow[11]) ;

    		temperature = parseInt(data.datashow[2]);
    		kelembaban = parseInt(data.datashow[3]);
    		heights = parseInt(data.datashow[1]);
    		tekanan = parseInt(data.datashow[4]);

    		param.setLintang(data.datashow[5]);
    		param.setBujur(data.datashow[6]);
		 arahAngin = Math.floor(Math.random() * (360 - 0 + 1)) + 0;; //random karena belum ada fungsi arah angin dari data gps
		 gaugeArahAngin.value = arahAngin;
		 
		 gaugeTekanan.value = tekanan;
		 

		


		 //manggil maps
		 // redraw(param.getLintang(), param.getBujur());
		});
};//sesi mengimpor dari index.js ke index.html selesai




// Grafik
$(function() {
	Highcharts.setOptions({
		global: {
			useUTC: false
		}
	});

 	

	Highcharts.chart('grafikTemperature', {
		chart: {
			type: 'spline',
	        animation: Highcharts.svg, // don't animate in old IE
	        marginRight: 10,
	        events: {
	        	load: function () {

	                // set up the updating of the chart each second
	                var series = this.series[0];
	                setInterval(function () {
	                    var x = (new Date()).getTime(), // current time
	                    y = temperature;
	                    series.addPoint([x, y], true, true);
	                }, 1000);
	            }
	        }
	    },

	    title: {
	    	text: 'Grafik temperatur'
	    },
	    xAxis: {
	    	type: 'datetime',
	    	crosshair: true,
	    	labels: {
                overflow: 'justify'
            },
	    	tickPixelInterval: 150
	    },
	    yAxis: {
	    	title: {
	    		text: 'Value'
	    	},

	    	crosshair: true,
	    	plotLines: [{
	    		value: 0,
	    		width: 1,
	    		color: '#808080'
	    	}]
	    },
	    tooltip: {
	    	formatter: function () {
	    		return '<b>' + this.series.name + '</b><br/>' +
	    		Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	    		Highcharts.numberFormat(this.y, 2);
	    	}
	    },
	    legend: {
	    	enabled: true
	    },
	    exporting: {
	    	enabled: false
	    },
	    series: [{
	    	name: 'Random data',
	    	data: (function () {
	            // generate an array of random data
	            var data = [],
	            time = (new Date()).getTime(),
	            i;

	            for (i = -19; i <= 0; i += 1) {
	            	data.push({
	            		x: time + i * 1000,
	            		y: temperature
	            	});
	            }
	            return data;
	        }())
	    }]
	});

	Highcharts.chart('grafikKelembaban', {
		chart: {
			type: 'spline',
	        animation: Highcharts.svg, // don't animate in old IE
	        marginRight: 10,
	        events: {
	        	load: function () {

	                // set up the updating of the chart each second
	                var series = this.series[0];
	                setInterval(function () {
	                    var x = (new Date()).getTime(), // current time
	                    y = kelembaban;
	                    series.addPoint([x, y], true, true);
	                }, 1000);
	            }
	        }
	    },
	    title: {
	    	text: 'Data kelembaban'
	    },
	    xAxis: {
	    	type: 'datetime',
	    	crosshair: true,
	    	tickPixelInterval: 150
	    },
	    yAxis: {
	    	crosshair:true,
	    	title: {
	    		text: 'Value'
	    	}
	    },
	    tooltip: {
	    	formatter: function () {
	    		return '<b>' + this.series.name + '</b><br/>' +
	    		Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	    		Highcharts.numberFormat(this.y, 2);
	    	}
	    },
	    legend: {
	    	enabled: true
	    },
	    exporting: {
	    	enabled: false
	    },
	    series: [{
	    	name: 'Random data',
	    	data: (function () {
	            // generate an array of random data
	            var data = [],
	            time = (new Date()).getTime(),
	            i;

	            for (i = -19; i <= 0; i += 1) {
	            	data.push({
	            		x: time + i * 1000,
	            		y: kelembaban
	            	});
	            }
	            return data;
	        }())
	    }]
	});

	Highcharts.chart('grafikKetinggian', {
		chart: { 
			type: 'arearange',
			zoomType: 'x',
			type: 'spline',
	        // animation: Highcharts.svg, // don't animate in old IE
	        marginRight: 10,
	        
	        events: {
	        	load: function () {

	                // set up the updating of the chart each second
	                var series = this.series[0];
	                setInterval(function () {
	                    var x = (new Date()).getTime(), // current time
	                    y = heights;
	                    series.addPoint([x, y], true, true);
	                }, 1000);
	            }
	        }
	    },

	    title: {
	    	text: 'Grafik ketinggian'
	    },
	    xAxis: {
	    	crosshair : true,
	    	type: 'datetime',
	    	tickPixelInterval: 150,
	    	labels: {
                overflow: 'justify'
            }
	    },
	    yAxis: {
	    	title: {
	    		text: 'Ketinggian dalam ft'
	    	},
	    	crosshair : true,
	    	minorGridLineWidth: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
	    	plotLines: [{
	    		value: 0,
	    		width: 1,
	    		color: '#808080'
	    	}]

	    },
	    tooltip: {
	    	formatter: function () {
	    		return '<b>' + this.series.name + '</b><br/>' +
	    		Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
	    		Highcharts.numberFormat(this.y, 2);
	    	}
	    },
	    legend: {
	    	enabled: true
	    },
	    exporting: {
	    	enabled: false
	    },
	    tooltip: {
            valueSuffix: ' feat'
        },
	   plotOptions: {
            spline: {
                lineWidth: 4,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                }

            }
        },
	    series: [{
	    	name: 'Data',
	    	data: (function () {
	            // generate an array of random data
	            var data = [],
	            time = (new Date()).getTime(),
	            i;

	            for (i = -19; i <= 0; i += 1) {
	            	data.push({
	            		x: time + i * 1000,
	            		y: heights
	            	});
	            }
	            return data;
	        }())
	    }]
	});

	



	//buat peta untuk redraw
	map = new google.maps.Map(document.getElementById('coordinate'), {
		zoom: 17,
		center: {lat: param.getLintang(), lng : param.getBujur(), alt: 0}
	});

	//buat marker untuk redraw
    map_marker = new google.maps.Marker({position: {lat: param.getLintang(), lng: param.getBujur()}, map: map});
    map_marker.setMap(map);

    

});//---------------batas highchart

// function redraw(Lintang, Bujur) {
//     map.setCenter({lat: Lintang, lng : Bujur, alt: 0}); // biar map ketengah
//     map_marker.setPosition({lat: Lintang, lng : Bujur, alt: 0}); // biar map ketengah

//     pushCoordToArray(Lintang, Bujur); //masukin nilai lintan dan bujur ke array coordinates

//     var lineCoordinatesPath = new google.maps.Polyline({
//        	path: lineCoordinatesArray,
//        	geodesic: true,
//        	strokeColor: '#ffeb3b',
//        	strokeOpacity: 1.0,
//        	strokeWeight: 2
//         });

//         lineCoordinatesPath.setMap(map); 
//     }

// function pushCoordToArray(latIn, lngIn) {
//       	lineCoordinatesArray.push(new google.maps.LatLng(latIn, lngIn));
// }


