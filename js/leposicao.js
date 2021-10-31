//ativa-desativa botão ok de acordo com o checkbox:
  $("#usarLocal").click(function() {
    $("#localOk").attr("disabled", !this.checked);
  });


var x=document.getElementById("saida");
function getLocation(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{
    x.innerHTML="Seu navegador não suporta Geolocalização.";}
  }
function showPosition(position){
  x.innerHTML="Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;  
  }
function showError(error){
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML="Solicitação de Geolocalização negada."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Localização indisponível."
      break;
    case error.TIMEOUT:
      x.innerHTML="A requisição expirou."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="Erro desconhecido."
      break;
    }
  }
