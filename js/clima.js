$("#tabela").hide();
$("#figurinha").hide();

var lati;
var longi;
var cidade;
var api_call;
function get () {
	lati = sessionStorage.getItem("pegaLat"),
  	longi = sessionStorage.getItem("pegaLong");
	cidade = JSON.parse(sessionStorage.getItem("pegaCid"));
  	console.log(lati);
  	console.log(longi);
	console.log(cidade);

var apiKey = '8eeafa93fa171bb970bfac9b03caa3a3',
	url = 'https://api.darksky.net/forecast/',
	//lati = "-18.9127749",
	//longi = "-48.2755227",
	opcoes = "?exclude=minutely,hourly,daily,flags,alerts";

api_call = url + apiKey + "/" + lati + "," + longi + opcoes;

//$.get("https://api.darksky.net/forecast/8eeafa93fa171bb970bfac9b03caa3a3/-18.9127749,-48.2755227?exclude=minutely,hourly,daily,flags,alerts", function( data ) {
$.get(api_call, function (data) {
	var clima = data;
	//console.log( data ); // HTML content of the jQuery.ajax page
	//console.log( clima );

	let icone = data.currently.icon;
	get_icon(icone);
	//icon.innerHTML = get_icon(icone);
	//icon.innerHTML = data.currently.icon;
	//c1.innerHTML = data.timezone.split("/")[1];
	c1.innerHTML = cidade;
	c2.innerHTML = data.latitude;
	c3.innerHTML = data.longitude;
	c4.innerHTML = new Date(data.currently.time * 1000).toISOString().slice(0, 19).replace('T', ' ');
	c5.innerHTML = data.currently.summary;
	c6.innerHTML = data.currently.precipIntensity + " milimetros por hora";
	c7.innerHTML = Math.round(parseFloat(data.currently.precipProbability)) * 100 + "%";
	c8.innerHTML = Math.round((parseFloat(data.currently.temperature) - 32) * 5 / 9) + "º celsius";
	c9.innerHTML = Math.round((parseFloat(data.currently.apparentTemperature) - 32) * 5 / 9) + "º celsius";
	c10.innerHTML = Math.round((parseFloat(data.currently.dewPoint) - 32) * 5 / 9) + "º celsius";
	c11.innerHTML = data.currently.humidity + "%";
	c12.innerHTML = (parseFloat(data.currently.pressure) / 1013).toFixed(2) + " atm";
	c13.innerHTML = data.currently.windSpeed + " metros por segundo";
	c14.innerHTML = data.currently.windGust + " metros por segundo";
	c15.innerHTML = degToCompass(data.currently.windBearing);
	//c15.innerHTML = data.currently.windBearing;
	c16.innerHTML = data.currently.cloudCover;
	c17.innerHTML = data.currently.uvIndex;
	c18.innerHTML = data.currently.visibility + " kilometros";
	c19.innerHTML = data.currently.ozone;
	c20.innerHTML = data.offset;

	function degToCompass(num) {
		var val = Math.floor((num / 22.5) + 0.5);
		var arr = ["Norte", "Nor-nordeste", "Nordeste", "Les–nordeste", "Leste", "Les–sudeste", "Sudeste", "Sul-sudeste", "Sul", "Sul-sudoeste", "Sudoeste", "Oes-sudoeste", "Oeste", "Oes-noroeste", "Noroeste", "Nor-noroeste"];
		return arr[(val % 16)];
	}


	function get_icon(icone) {
		console.log(icone);
		if (icone === 'clear-day') {
			icon.innerHTML = '<i class="wi wi-day-sunny"></i>';
			$("#clima").html("Dia claro");
		}
		else if (icone === 'clear-night') {
			icon.innerHTML = '<i class="wi wi-night-clear"></i>';
			$("#clima").html("Noite clara");
		}
		else if (icone === 'partly-cloudy-day') {
			icon.innerHTML = '<i class="wi wi-day-cloudy"></i>';
			$("#clima").html("Dia parcialmente nublado");
		}
		else if (icone === 'partly-cloudy-night') {
			icon.innerHTML = '<i class="wi wi-night-alt-cloudy"></i>'
			$("#clima").html("Noite parcialmente nublada");
		}
		else if (icone === 'cloudy') {
			icon.innerHTML = '<i class="wi wi-cloudy"></i>';
			$("#clima").html("Nublado");
		}
		else if (icone === 'rain') {
			icon.innerHTML = '<i class="wi wi-rain"></i>';
			$("#clima").html("Chuvoso");
		}
		else if (icone === 'sleet') {
			icon.innerHTML = '<i class="wi wi-sleet"></i>';
			$("#clima").html("Granizo");
		}
		else if (icone === 'snow') {
			icon.innerHTML = '<i class="wi wi-snow"></i>';
			$("#clima").html("Neve");
		}
		else if (icone === 'wind') {
			icon.innerHTML = '<i class="wi wi-strong-wind"></i>';
			$("#clima").html("Ventos fortes");
		}
		else if (icone === 'fog') {
			icon.innerHTML = '<i class="wi wi-fog"></i>';
			$("#clima").html("Neblina");
		}
	}


});
$("#tabela").show();
$("#figurinha").show();

}

/*
E leste
N norte
W oeste
S sul
NE nordeste
NW noroeste
SE sudeste
SW sudoeste
ENE les–nordeste
ESE les–sudeste
SSE sul-sudeste
NNE nor-nordeste
NNW nor-noroeste
SSW sul-sudoeste
WSW oés-sudoeste
WNW oés-noroeste
*/