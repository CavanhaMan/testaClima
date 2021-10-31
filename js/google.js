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
//<script src="https://cdn.jsdelivr.net/gh/bigdatacloudapi/js-reverse-geocode-client@latest/bigdatacloud_reverse_geocode.min.js" type="text/javascript"></script>
    /* Initialise Reverse Geocode API Client */
    var reverseGeocoder=new BDCReverseGeocode();
	/* You can also set the locality language as needed */
    reverseGeocoder.localityLanguage='pt';
    /* Get the current user's location information, based on the coordinates provided by their browser */
    /* Fetching coordinates requires the user to be accessing your page over HTTPS and to allow the location prompt. */
    reverseGeocoder.getClientLocation(function(result) {
    	console.log("1) ")
        console.log(result);
        saida.innerHTML="Latitude: " + result.latitude +
        "<br>Longitude: " + result.longitude +
        "<br>Cidade: " + result.city +
        "<br>Estado: " + result.principalSubdivision;
        "<br>País: " + result.countryName;
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