var latitude;
var longitude;
var chaveG;
var x = document.getElementById("saida");
var latlng;

// ===PARTE DO GOOGLE:====================================================
//A chave do google foi armazenada em um arquivo local 'google.key'
//Este arquivo foi incluido no .gitignore para não ser enviado para o github
jQuery.get('google.key', function (chaveG) {
	console.log("chaveG = " + typeof (chaveG));
	var google_api = document.createElement('script'), api_key = chaveG;
	// Inject the script for Google's API and reference the initGoogleAPI
	// function as a callback.
  	google_api.src = 'https://maps.googleapis.com/maps/api/js?key=' + api_key + '&callback=initGoogleAPI&libraries=places,geometry';
	document.body.appendChild(google_api);
});
// =======================================================================

/*****************************************************************/
if (navigator.geolocation)
	navigator.geolocation.getCurrentPosition(showPosition, showError);
else
	x.innerHTML = "Geocoder error!";

function showPosition(position) {
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	latlng = [latitude, longitude];
	console.log("latlng: "+latlng);
	//codeLatLng()
	x.innerHTML = "Latitude: " + latitude +
		"<br>Longitude: " + longitude;
}
function showError(error) {
	x.innerHTML = "Geocoder error!"
}

const extractCityName = latlng => {
	googleMapsClient.reverseGeocode({ latlng }, (err, response) => {
	  if (!err) {
		return response.json.plus_code.compound_code.split(' ').slice(1).join(' ');
	  }
	});
  }; 
  // examples: 
  console.log(extractCityName(40.6599718,-73.9817292));
  // New York, NY, USA
  console.log(extractCityName(37.386052, -122.083851));
  // Mountain View, CA, USA
  console.log(extractCityName(51.507351, -0.127758));
  // Westminster, London, UK



/*****************************************************************/


// SearchBox Method
function initGoogleAPI() {
	var autocomplete = new google.maps.places.SearchBox(document.querySelector("#city-search"));
	autocomplete.addListener('places_changed', function () {
		var place = autocomplete.getPlaces()[0];
		latitude = place.geometry.location.lat();
		console.log("A= " + latitude);
		longitude = place.geometry.location.lng();
		console.log("A= " + longitude);
		sessionStorage.setItem("pegaLat", latitude);
		sessionStorage.setItem("pegaLong", longitude);
		console.log($('#city-search').val());
		sessionStorage.setItem("pegaCid", JSON.stringify($('#city-search').val()));
	});
}
/*
	$("#saida").innerHTML="
		Você está aqui ó:
		<br>Latitude: " + latitude +
		"<br>Longitude: " + longitude +
		"<br>Local: " + $('#city-search').val();

	var x=document.getElementById("saida");
	x.innerHTML="Latitude: " + latitude +
	"<br>Longitude: " + longitude +
	"<br>Local: " + $('#city-search').val();
 */

//insertGoogleScript();

//location.href = "tela_clima.html";

/*$('button').on('click', function (e) {
});*/