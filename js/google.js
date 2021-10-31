var latitude;
var longitude;
var chaveG;
// =================================================
// PARTE DO GOOGLE:
function insertGoogleScript() {
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
}

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

insertGoogleScript();

//location.href = "tela_clima.html";

/*$('button').on('click', function (e) {
});*/