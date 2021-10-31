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
//FREE REVERSE GEOCODING API
var reverse_api = document.createElement('script');
reverse_api.src="https://cdn.jsdelivr.net/gh/bigdatacloudapi/js-reverse-geocode-client@latest/bigdatacloud_reverse_geocode.min.js"
document.body.appendChild(reverse_api);

var reverseGeocoder=new BDCReverseGeocode();
reverseGeocoder.localityLanguage='pt';
/* Get the administrative location information using a set of known coordinates */
reverseGeocoder.getClientLocation(function(result) {
	console.log(result);
	saida.innerHTML=result.city;      
});
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