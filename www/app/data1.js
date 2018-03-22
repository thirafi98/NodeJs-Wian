var temperature = 0, 
	kelembaban = 0,
	arahAngin = 0;

var param = {
        lintang 	: -6.9147439 , //Bandung
        bujur 		: 107.609809875, //Bandung
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

function update(){
	const socket = io.connect();

	socket.on('socketData', (data)=>{
		console.log(data);

		document.getElementById("receiveData").innerHTML = data.datahasil;

		$( "#head" ).html(data.datahasil[0]) ;
		$( "#ketinggian" ).html(data.datahasil[1]) ;
		$( "#temperature" ).html(data.datahasil[2]) ;
		$( "#humidity" ).html(data.datahasil[3]) ;
		$( "#pressure" ).html(data.datahasil[4]) ;
		$( "#latitude" ).html(data.datahasil[5]) ;
		$( "#longitude" ).html(data.datahasil[6]) ;
		$( "#co2" ).html(data.datahasil[7]) ;
		$( "#x" ).html(data.datahasil[8]) ;
		$( "#y" ).html(data.datahasil[9]) ;
		$( "#z" ).html(data.datahasil[10]) ;
		$( "#IMG" ).html(data.datahasil[11]) ;

		 temperature = parseInt(data.datahasil[2]);
		 kelembaban = parseInt(data.datahasil[3]);
		 param.setLintang(data.datahasil[5]);
		 param.setBujur(data.datahasil[6]);
		 arahAngin = Math.floor(Math.random() * (360 - 0 + 1)) + 0;; //kasih random karena belum ada fungsi arah angin dari data gps
		 gaugeArahAngin.value = arahAngin;

		 //redraw maps
		 redraw(param.getLintang(), param.getBujur());
	});
}

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
	        text: 'Live random data'
	    },
	    xAxis: {
	        type: 'datetime',
	        tickPixelInterval: 150
	    },
	    yAxis: {
	        title: {
	            text: 'Value'
	        },
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
	        enabled: false
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
	        text: 'Live random data'
	    },
	    xAxis: {
	        type: 'datetime',
	        tickPixelInterval: 150
	    },
	    yAxis: {
	        title: {
	            text: 'Value'
	        },
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
	        enabled: false
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



	//Make map
        map = new google.maps.Map(document.getElementById('coordinate'), {
          zoom: 17,
          center: {lat: param.getLintang(), lng : param.getBujur(), alt: 0}
        });

        //make marker
        map_marker = new google.maps.Marker({position: {lat: param.getLintang(), lng: param.getBujur()}, map: map});
        map_marker.setMap(map);
     
       
}); // end jquery




        function redraw(Lintang, Bujur) {
          map.setCenter({lat: Lintang, lng : Bujur, alt: 0}); // biar map ketengah
          map_marker.setPosition({lat: Lintang, lng : Bujur, alt: 0}); // biar map ketengah

          pushCoordToArray(Lintang, Bujur); //masukin nilai lintan dan bujur ke array coordinates

          var lineCoordinatesPath = new google.maps.Polyline({
              path: lineCoordinatesArray,
              geodesic: true,
              strokeColor: '#ffeb3b',
              strokeOpacity: 1.0,
              strokeWeight: 2
            });

            lineCoordinatesPath.setMap(map); 
        }

        function pushCoordToArray(latIn, lngIn) {
          lineCoordinatesArray.push(new google.maps.LatLng(latIn, lngIn));
        }

       