$(document).ready(function(){
    var map;
    var markersArray = [];

    $(".search-city-button").click(function(){
        var searchCity = $(".search-city-input").val();

        // transformar o nome da cidade em lat e long
        var geocoder = new google.maps.Geocoder();
        var geocodeRequest = {
            address: searchCity
        };
        geocoder.geocode(geocodeRequest, geocodeResponse);

        function geocodeResponse(results, status) {
            if(status == "OK"){
                // pegar o resultado
                var latlongCity = results[0].geometry.location;
                    map = new google.maps.Map(document.getElementById('map'), {
                    center: latlongCity,
                    zoom: 12
                });
                $(".menu-options").show();

                $(".location-type").click(function(){
                    var service = new google.maps.places.PlacesService(map);
                    clearOverlays();
                    service.nearbySearch({
                        location: latlongCity,
                        radius: 30000,
                        types: [$(this).attr('id')]
                    }, nearbySearchResult);
                });
            } else {
                // exibir mensagem de erro
            }
        }
    });

    function nearbySearchResult(results, status){
        if(status == "OK") {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        markersArray.push(marker);
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }

    function clearOverlays() {
        for (var i = 0; i < markersArray.length; i++ ) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
    }
});

function init(){}
