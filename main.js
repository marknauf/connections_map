Plotly.d3.csv('https://raw.githubusercontent.com/rythei/connections_map/ryan_map/test_companies.csv', function(err, rows){
		function unpack(rows, key) {
	    return rows.map(function(row) { return row[key]; });
	}

	myPlot = document.getElementById('myDiv'),
		cName = unpack(rows, 'name'),
	    cLat = unpack(rows, 'lat'),
	    cLon = unpack(rows, 'lon'),
		cCap = unpack(rows, 'mCap'),
		scale = 10000000000,
		cSize = [],
		cText = [],
		color = [,"rgb(255,65,54)","rgb(133,20,75)","rgb(255,133,27)","lightgrey"],
		isClicked = false,
		connections = [[]],
		nCon = cName.length,
		click_count = 0,
       	traces = [];


	for ( var i = 0 ; i < cCap.length; i++) {
	        var currentSize = cCap[i] / scale;
			var currentText = cName[i] + '<br>$' +cCap[i]/1000000000 + 'b';
			cText.push(currentText);
	        cSize.push(currentSize);
	}

	for(var i = 0; i < cCap.length; i++){
		var temp = [];
		connections.push(temp);
		for(var j = 0; j < cCap.length; j++){
			connections[i][j] = rows[i][j]
		}
	}

	var data = [{
	   type: 'scattergeo',
	   locationmode: 'USA-states',
	   lat: cLat,
	   lon: cLon,
	   hoverinfo: 'text',
	   text: cText,
	   marker: {
	     size: cSize,
		 color: 'rgb(255,255,255)',
		 opacity: 1,
		 symbol: "circle-cross"
	   },
	}];

	var layout = {
	    title: '',
	    showlegend: false,
 	    margin:{
 	    	l: 30,
		    r: 30,
		    b: 30,
		    t: 30,
 	    	pad: 0
 	    },
	    geo: {
	      scope: 'usa',
	      projection: {
	        type: 'albers usa'
	      },
	      showland: true,
	      landcolor: 'rgb(0,0,0)', //grey is 79,72,73
	      subunitcolor: 'rgb(0,255,255)',
	      countrycolor: 'rgb(0,255,255)',
	      countrywidth: 1,
 		  subunitwidth: 0.2,
		 // paper_bgcolor: 'rgb(0,0,0)',
		  bgcolor: 'rgb(0,0,0)'
	    },
	};

	Plotly.plot(myDiv, data, layout, {showLink: false});


	myPlot.on("plotly_click", function(data){
		if(isClicked == true){
			var update = [{
				mode: 'markers',
			   type: 'scattergeo',
			   locationmode: 'USA-states',
			   lat: cLat,
			   lon: cLon,
			   hoverinfo: 'text',
			   text: cText,
			   marker: {
			     size: cSize,
				 color: 'rgb(255,255,255)',
				   opacity: .75
			   },
			}];


			//Plotly.deleteTraces(myDiv, [-1,-2])
			console.log(traces)
			Plotly.deleteTraces(myDiv,traces)
			Plotly.plot(myDiv, update,layout);
			isClicked = false;
		}
		else{

			cPoint = data.points[0].pointNumber;

			var sLat = cLat[cPoint];
			var sLon = cLon[cPoint];

			var nLat = [];
			var nLon = [];

			for(var i=0;i<nCon;i++){
				if(parseInt(connections[cPoint][i]) == 1){
					nLat.push(cLat[i]);
					nLon.push(cLon[i]);
				}
			}

			traces = [];
			var nUpdate1 = [];
			for ( var i = 0 ; i < nLat.length; i++ ) {

			        var result = {
		 				mode: 'lines+markers',
		 			   type: 'scattergeo',
		 			   locationmode: 'USA-states',
						lat: [sLat,nLat[i]],
						lon: [sLon,nLon[i]],
		 			   hoverinfo: 'text',
		 			   text: cText,
		 			   marker: {
		 			     size: cSize,
		 				 color: 'rgb(255, 255, 255)',
		 				   opacity: .75
		 			   },
				};

				traces.push(-i-1);

			        nUpdate1.push(result);
			};

			var nUpdate = [{
				mode: 'lines+markers',
			   type: 'scattergeo',
			   locationmode: 'USA-states',
			   lat: nLat,
			   lon: nLon,
			   hoverinfo: 'text',
			   text: cText,
			   marker: {
			     size: cSize,
				 color: 'rgb(255, 255, 255)',
				   opacity: .75
			   },
			}];


			console.log(traces)
			Plotly.plot(myDiv, nUpdate1, layout);
			isClicked = true;
			click_count++;
		}
	});
});

setTimeout(function() {
	if($(".countries path")) {
		var item = $(".countries path:first");
		item.css('stroke', 'rgba(0,255,255, .9)');
		var dataArrayPoints = item.attr("d").split(",");
		$(".countries:first").append(item.clone().attr('id', 'crowBaller1').css('stroke', 'rgba(0,255,255,.9)').css('stroke-width', '2.5px'));
		$(".countries:first").append(item.clone().attr('id', 'crowBaller2').css('stroke', 'rgba(0,255,255,.93)').css('stroke-width', '3px'));
		$(".countries:first").append(item.clone().attr('id', 'crowBaller3').css('stroke', 'rgba(0,255,255,.97)').css('stroke-width', '3.5px'));
		$(".countries:first").append(item.clone().attr('id', 'crowBaller4').css('stroke', 'rgba(0,255,255,1)').css('stroke-width', '4px'));

		$(".countries:first").append(item.clone().attr('id', 'crowBaller5').css('stroke', 'rgba(0,255,255,.9)').css('stroke-width', '2.5px'));
		$(".countries:first").append(item.clone().attr('id', 'crowBaller6').css('stroke', 'rgba(0,255,255,.93)').css('stroke-width', '3px'));
		$(".countries:first").append(item.clone().attr('id', 'crowBaller7').css('stroke', 'rgba(0,255,255,.97)').css('stroke-width', '3.5px'));
		$(".countries:first").append(item.clone().attr('id', 'crowBaller8').css('stroke', 'rgba(0,255,255,1)').css('stroke-width', '4px'));
		var array = item.attr("d").split("L");

		var i = 0, j = parseInt(array.length / 3);

		var fuck = function(k) {
			// console.log(item.attr("d"));
			// console.log(array);

			var string = array[k];
			if(!string.startsWith("M")) {
				string = "M"+string;
			}
			string += "L"+array[k + 1];
			if(!string.endsWith("Z")) {
				string += "Z";
			}

			// console.log(string);
			// console.log(string);
			// console.log(null)
			return string;
		}

		setInterval(function() {
			if(i >= array.length - 4) {
				i = 0;
			}

			if(j >= array.length - 4) {
				j = 0;
			}
			$("#crowBaller1").attr("d", fuck(i));
			$("#crowBaller2").attr("d", fuck(i + 1));
			$("#crowBaller3").attr("d", fuck(i + 2));
			$("#crowBaller4").attr("d", fuck(i + 3));

			$("#crowBaller5").attr("d", fuck(j));
			$("#crowBaller6").attr("d", fuck(j + 1));
			$("#crowBaller7").attr("d", fuck(j + 2));
			$("#crowBaller8").attr("d", fuck(j + 3));
			i++;
			j++;
		}, 50);
	}


	var yolo = 0;
	$(".scattergeolayer > .trace.scattergeo path").each(function() {
		console.log($(this));
		var fuckThis = cCap[yolo++] / scale;
		console.log(fuckThis);
		var offsetJ = $(this).offset();
		console.log(offsetJ);
		if(fuckThis < 15) {
			fuckThis = 15;
		}
		$("body").append("<div id='party"+yolo+"' class='gotohell' style='width: "+fuckThis+"px; height: "+fuckThis+"px; top: "+offsetJ.top+"px; left: "+offsetJ.left+"px'></div>");
		setTimeout(function(test) {
			console.log('here'+test)
			$("#party" + test).addClass('party');
		}, 1000 * yolo, yolo);
	});
	//
	// $("<div></div>").
	// $("#test").position();




}, 1000);
