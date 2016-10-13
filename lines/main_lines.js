Plotly.d3.csv('https://raw.githubusercontent.com/rythei/plotly_test/data_w_mCap/test_companies.csv', function(err, rows){
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
		nCon = cName.length,
		click = 1;

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
	     size: 20,
		 color: 'rgb(255,198,39)',
		 opacity: 1	   
	   },
	}];

	var layout = {
	    title: 'Companies<br>Lines',
	    showlegend: false,
	    geo: {
	      scope: 'usa',
	      projection: {
	        type: 'albers usa'
	      },
	      showland: true,
	      landcolor: 'rgb(217, 217, 217)',
	      subunitwidth: 1,
	      countrywidth: 1,
	      subunitcolor: 'rgb(255,255,255)',
	      countrycolor: 'rgb(255,255,255)'
	    },
	};

	p = Plotly.plot(myDiv, data, layout, {showLink: false});
	p;

	myPlot.on("plotly_click", function(data){
		if(isClicked == true){
			Plotly.redraw('myDiv', data,layout);
			isClicked = false;
		}
		else{
			
			cPoint = data.points[0].pointNumber
			
			var sLat = [];
			var sLon = [];
			var nLat = [];
			var nLon = [];

			for(var i=0;i<nCon;i++){
				if(parseInt(connections[cPoint][i]) == 1){
					nLat.push(cLat[i]);
					nLon.push(cLon[i]);
					sLat.push(cLat[cPoint]);
					sLon.push(cLon[cPoint]);
				}
			}
			
			var update = []
			for(var i =0; i<nCon; i++){
				var result = {
	   			  locationmode: 'USA-states',
			      type: 'scattergeo',
			      lat: [ sLat[i], nLat[i] ],
			      lon: [ sLon[i], nLon[i] ],
			      mode: 'lines+markers',
			      line:{
			        width: 2,
			        color: 'rgb(255,198,39)'
			      },
			   	  hoverinfo: 'text',
			   	  text: cText,
			   	  marker: {
			   	  	size: 20,
			   		color: 'rgb(255,198,39)',
			   		opacity: 1	   
			   	  }
			    };
				
				update.push(result);
				
			}
			
			Plotly.addTraces(myDiv, update);
			
			isClicked = true;
		}
	});
	

});