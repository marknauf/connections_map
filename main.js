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
		width: $(window).width(),
		height: $(window).height(),
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
	      landcolor: 'transparent', //grey is 79,72,73
	      subunitcolor: 'rgb(0,255,255)',
	      countrycolor: 'rgb(0,255,255)',
	      countrywidth: 1,
 		  subunitwidth: 0.2,
		 // paper_bgcolor: 'rgb(0,0,0)',
		  bgcolor: 'transparent'
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

			Plotly.plot(myDiv, nUpdate1, layout);
			isClicked = true;
			click_count++;
		}
	});
});

setTimeout(function() {
	var item, dataArrayPoints, array;
	var redraw = function() {
		item = $(".countries path:first");
		dataArrayPoints = item.attr("d").split(",");
		array = item.attr("d").split("L");

		var index = 0;
		$(".scattergeolayer > .trace.scattergeo path").each(function() {
			var offset = 0;
			var fuckThis = (cCap[index++] / scale);
			var offsetJ = $(this).offset();
			if(fuckThis < 25) {
				offset = (25 - fuckThis) / 4;
				fuckThis = 25;
			}
			if($("#party"+index))
				$("#party"+index).css("width", fuckThis+"px").css("height", fuckThis+"px").css("top", (offsetJ.top - offset)+"px").css("left", (offsetJ.left - offset)+"px");
		});
	};

	setInterval(redraw, 200);

	redraw();

	if($(".countries path")) {
		item.css('stroke', 'rgba(0,255,255, .9)');
		$(".countries:first").append(item.clone().attr('id', 'crowBaller1').css('stroke', 'rgba(0,255,255,.9)').css('stroke-width', '2.5px'));
		$(".countries:first").append(item.clone().attr('id', 'crowBaller2').css('stroke', 'rgba(0,255,255,.93)').css('stroke-width', '3px'));
		$(".countries:first").append(item.clone().attr('id', 'crowBaller3').css('stroke', 'rgba(0,255,255,.97)').css('stroke-width', '3.5px'));
		$(".countries:first").append(item.clone().attr('id', 'crowBaller4').css('stroke', 'rgba(0,255,255,1)').css('stroke-width', '4px'));

		$(".countries:first").append(item.clone().attr('id', 'crowBaller5').css('stroke', 'rgba(0,255,255,.9)').css('stroke-width', '2.5px'));
		$(".countries:first").append(item.clone().attr('id', 'crowBaller6').css('stroke', 'rgba(0,255,255,.93)').css('stroke-width', '3px'));
		$(".countries:first").append(item.clone().attr('id', 'crowBaller7').css('stroke', 'rgba(0,255,255,.97)').css('stroke-width', '3.5px'));
		$(".countries:first").append(item.clone().attr('id', 'crowBaller8').css('stroke', 'rgba(0,255,255,1)').css('stroke-width', '4px'));

		var i = 0, j = parseInt(array.length / 3);

		var fuck = function(k) {
			var string = array[k];
			if(!string.startsWith("M")) {
				string = "M"+string;
			}
			string += "L"+array[k + 1];
			if(!string.endsWith("Z")) {
				string += "Z";
			}

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
		yolo++;
		$("body").prepend("<div id='party"+yolo+"' class='gotohell'></div>");
		redraw();
		setTimeout(function(test) {
			$(".scattergeolayer > .trace.scattergeo path:nth-child("+test+")").addClass('party');
			$("#party" + test).addClass('party');
		}, 1000 * yolo, yolo);
	});

}, 500);
