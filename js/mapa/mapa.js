let mapa;
let directionsService;
let directionsRenderer;
var punto ;
var origen = null;
var marker = null;
//Función encargada de cargar el mapa 
 function initMap() {
     punto = new google.maps.LatLng(39.42959558403281, -0.39404933831108163);
    var opciones = {
        zoom: 15,
        center: punto,
        mapId: "eacb9f74c2597a95a6157294",
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    mapa = new google.maps.Map(document.getElementById('mapa'), opciones);
    //  marcador
    var marca = new google.maps.Marker({
        map: mapa,
        position: punto,
        title: "Nomadix"
    });
    const content = `<div class="content-inforWindow">
        <b>Nomadix<br>
        Empresa de Mudanzas</b><br>
        Dirección: Avinguda Real de Madrid, 102 <br>
        València, Valencia <br>
        CP: 46017
        </div>
    `;
    var caja = new google.maps.InfoWindow({
        content: content,
        maxWidth: 300
    });
    marca.addListener( 'click', function () {
        caja.open(mapa, marca);
    });
    
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({map:mapa, suppressMarkers: true});
    directionsRenderer.setMap(mapa);
}
//Función encargada para convertir la dirección introducida en coordenads para Google Maps
//También se encarga de llamar a la función calcularRutas() pasandole la direccion como parámetro
function geo(){
    var geo = new google.maps.Geocoder();
    var location = document.getElementById('search-box').value.trim();

    //limpiamos las marcas de las antiguas direcciones (si las había)
    if (marker) {
    marker.setMap(null);
    }

    geo.geocode({'address': location},function (results,status){
        if(status=== 'OK'){
            origen = results[0].geometry.location;
            mapa.setCenter(origen);
            marker = new google.maps.Marker({ //hacemos lo mismo con la marca de la direccion del mapa 
            map: mapa,
            position:origen}); 
            calcularRuta(origen);
        } else {
            alert('No se ha encontrado esa localizacion : ' + status);
        }
    })        
}
//Función encargada de calcular la ruta entre el punto A hasta el punto B 
function calcularRuta() {
     // Verifica si la API de Google Maps se ha cargado correctamente
        if (typeof google === 'undefined' || !google.maps) {
            console.error("Google Maps API no está cargada correctamente.");
            return;
        }
        //obtener los valores 
    var request = {
        origin: origen,
        destination: punto,
        travelMode: google.maps.TravelMode.DRIVING // Puedes cambiar a WALKING, BICYCLING, o TRANSIT
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

        } else {
            alert('No se pudo calcular la ruta: ' + status);
        }
    });
}


//Añadimos al botón buscar ruta la función geo(). 
//Cada vez que se haga click aqui, buscará la ruta 
var dir = document.getElementById('search-box');
var buscar = document.getElementById('buscarRuta');
if(!dir || dir.value == ""){
buscar.addEventListener('click', ()=>{
    geo();
});

}

//Esta función se dene cargar nada más cargue el archivo script
window.addEventListener("load", initMap);


