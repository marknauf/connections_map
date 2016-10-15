Plotly.d3.csv('https://raw.githubusercontent.com/rythei/connections_map/ryan_map/test_companies.csv', function(err, rows){
		function unpack(rows, key) {
	    return rows.map(function(row) { return row[key]; });
	}

	var myPlot = document.getElementById('myDiv'),
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
		nCon = cName.length;

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
	     size: 35,
		 color: 'rgb(243,243,21)',
		 opacity: .75,
		 symbol: "circle-cross"  
	   },
	}];

	var layout = {
	    title: 'Companies<br>Click for connections',
	    showlegend: false,
	    geo: {
	      scope: 'usa',
	      projection: {
	        type: 'albers usa'
	      },
	      showland: true,
	      landcolor: 'rgb(0,0,0)', //grey is 79,72,73
	      subunitwidth: 0,
	      countrywidth: 4,
	      subunitcolor: 'rgb(79,72,73)',
	      countrycolor: 'rgb(253,0,255)',
		  paper_bgcolor: 'rgb(0,0,0,0)',
		  bgcolor: 'rbg(0,0,0,0)'
	    },
	};

	Plotly.plot(myDiv, data, layout, {showLink: false});

	myPlot.on("plotly_click", function(data){
		if(isClicked == true){
			var update = [{
			   type: 'scattergeo',
			   locationmode: 'USA-states',
			   lat: cLat,
			   lon: cLon,
			   hoverinfo: 'text',
			   text: cText,
			   marker: {
			     size: 35,
				 color: 'rgb(243,243,21)',
				   opacity: .75	   
			   },
			}];
	
			Plotly.deleteTraces(myDiv,0)
			Plotly.plot(myDiv, update,layout);
			isClicked = false;
		}
		else{
			cPoint = data.points[0].pointNumber
			
			//var sLat = cLat[cPoint];
			//var sLon = cLon[cPoint];
			
			var nLat = []
			var nLon = []

			for(var i=0;i<nCon;i++){
				if(parseInt(connections[cPoint][i]) == 1){
					nLat.push(cLat[i]);
					nLon.push(cLon[i]);
				}
			}
			

			var nUpdate = [{
				mode: 'lines+markers',
			   type: 'scattergeo',
			   locationmode: 'USA-states',
			   lat: nLat,
			   lon: nLon,
			   hoverinfo: 'text',
			   text: cText,
			   marker: {
			     size: 35,
				 color: 'rgb(255, 255, 255)',
				   opacity: .75	   
			   },
			}];
			
			Plotly.deleteTraces(myDiv,0)
			Plotly.plot(myDiv, nUpdate, layout);
			isClicked = true;
		}
	});
	

});