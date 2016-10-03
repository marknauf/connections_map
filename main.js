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
		isClicked = false;

	for ( var i = 0 ; i < cCap.length; i++) {
	        var currentSize = cCap[i] / scale;
			var currentText = cName[i] + '<br>$' +cCap[i]/1000000000 + 'b';
			cText.push(currentText)
	        cSize.push(currentSize);
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
		 color: 'rgb(255,198,39)',
		 opacity: 1	   
	   },
	}];

	var layout = {
	    title: 'Companies<br>Size scaled by market cap',
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

	Plotly.plot(myDiv, data, layout, {showLink: false});

	myPlot.on("plotly_click", function(data){
		if(isClicked == false){
			var update = {			
				marker: {
					color: 'rgb(140,29,64)',
					size: cSize,
					opacity: 1
				}
			};
	
			Plotly.restyle(myDiv, update,0);
			isClicked = true;
		}
		else{
			cPoint = data.points[0].pointNumber
			
			var nUpdate = {
			   marker: {
			     size: cSize,
				 color: 'rgb(255,198,39)',
				 opacity: 1	   
			   }
			};
		
			Plotly.restyle(myDiv, nUpdate, 0);
			isClicked = false;
		}
	});
	

});