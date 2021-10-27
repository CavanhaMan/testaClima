var latitude;
var longitude;

// =================================================
// PARTE DO GOOGLE:
function insertGoogleScript() {
	var google_api = document.createElement('script'),
		api_key = 'KEYKEYKEYKEYKEYKEYKEYKEYKEYKEYKEYKEYKEY';
	// Inject the script for Google's API and reference the initGoogleAPI
	// function as a callback.
	google_api.src = 'https://maps.googleapis.com/maps/api/js?key=' + api_key + '&callback=initGoogleAPI&libraries=places,geometry';
	document.body.appendChild(google_api);
}

// SearchBox Method
function initGoogleAPI() {
	var autocomplete = new google.maps.places.SearchBox(document.querySelector("#city-search"));
	autocomplete.addListener('places_changed', function () {
		var place = autocomplete.getPlaces()[0];
		latitude = place.geometry.location.lat();
		console.log("A= "+latitude);
		longitude = place.geometry.location.lng();
		console.log("A= "+longitude);
	});
}

insertGoogleScript();
console.log("B= "+latitude);
console.log("B= "+longitude);
// =================================================
// PARTE DO CLIMA:
$('button').on('click', function (e) {
	console.log("D= "+latitude);
	console.log("D= "+longitude);
	
	var apiKey = '8eeafa93fa171bb970bfac9b03caa3a3',
		url = 'https://api.darksky.net/forecast/',
		opcoes = "?exclude=minutely,hourly,daily,flags,alerts"
	api_call = url + apiKey + "/" + latitude + "," + longitude + opcoes;

	//$.get("https://api.darksky.net/forecast/8eeafa93fa171bb970bfac9b03caa3a3/-18.9127749,-48.2755227?exclude=minutely,hourly,daily,flags,alerts", function( data ) {
	$.get(api_call, function (data) {
		var clima = data;
		//console.log( data ); // HTML content of the jQuery.ajax page
		//console.log( clima );

		let icone = data.currently.icon;
		get_icon(icone);
		//icon.innerHTML = get_icon(icone);
		//icon.innerHTML = data.currently.icon;
		c1.innerHTML = data.timezone.split("/")[1];
		c2.innerHTML = data.latitude;
		c3.innerHTML = data.longitude;
		c4.innerHTML = new Date(data.currently.time * 1000).toISOString().slice(0, 19).replace('T', ' ');
		c5.innerHTML = data.currently.summary;
		c6.innerHTML = data.currently.precipIntensity + " milimetros por hora";
		c7.innerHTML = parseFloat(data.currently.precipProbability) * 100 + "%";
		c8.innerHTML = Math.round((parseFloat(data.currently.temperature) - 32) * 5 / 9) + "º celsius";
		c9.innerHTML = Math.round((parseFloat(data.currently.apparentTemperature) - 32) * 5 / 9) + "º celsius";
		c10.innerHTML = data.currently.dewPoint + "º celsius";
		c11.innerHTML = data.currently.humidity;
		c12.innerHTML = data.currently.pressure + " hectopascais";
		c13.innerHTML = data.currently.windSpeed + " metros por segundo";
		c14.innerHTML = data.currently.windGust + " metros por segundo";
		c15.innerHTML = data.currently.windBearing;
		c16.innerHTML = data.currently.cloudCover;
		c17.innerHTML = data.currently.uvIndex;
		c18.innerHTML = data.currently.visibility + " kilometros";
		c19.innerHTML = data.currently.ozone;
		c20.innerHTML = data.offset;

		function get_icon(icone) {
			//console.log(icone);
			if (icone === 'clear-day') { icon.innerHTML = '<i class="wi wi-day-sunny display-2 mb-3"></i>' }
			else if (icone === 'clear-night') { icon.innerHTML = '<i class="wi wi-night-clear display-2 mb-3"></i>' }
			else if (icone === 'partly-cloudy-day') { icon.innerHTML = '<i class="wi wi-day-cloudy display-2 mb-3"></i>' }
			else if (icone === 'partly-cloudy-night') { icon.innerHTML = '<i class="wi wi-night-alt-cloudy display-2 mb-3"></i>' }
			else if (icone === 'cloudy') { icon.innerHTML = '<i class="wi wi-cloudy display-2 mb-3"></i>' }
			else if (icone === 'rain') { icon.innerHTML = '<i class="wi wi-rain display-2 mb-3"></i>' }
			else if (icone === 'sleet') { icon.innerHTML = '<i class="wi wi-sleet display-2 mb-3"></i>' }
			else if (icone === 'snow') { icon.innerHTML = '<i class="wi wi-snow display-2 mb-3"></i>' }
			else if (icone === 'wind') { icon.innerHTML = '<i class="wi wi-strong-wind display-2 mb-3"></i>' }
			else if (icone === 'fog') { icon.innerHTML = '<i class="wi wi-fog display-2 mb-3"></i>' }
		}

	});

});