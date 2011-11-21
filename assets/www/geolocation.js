
$(document).bind("mobileinit", function(){
		$('#pageGeolocation').live('pagebeforeshow',function(event){
			getPosition();
		});
});

function getPosition() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});
	
	function onSuccess(position) {
		
//	    document.getElementById("accuracy").innerHTML = position.coords.accuracy;
//	    document.getElementById("timestamp").innerHTML = new Date(position.timestamp);
//	    document.getElementById("infoGeolocation").style.display = "";
	    
	    loadMap("map_canvas", position.coords.latitude, position.coords.longitude, position.coords.accuracy);
		nearestPoint(position.coords.latitude, position.coords.longitude);
	};
	
	function onError(error) {
	    alert('Error: ' + error.message);
	}
}

var map;

function loadMap(idMapCanvas, latitude, longitude, accuracy) {
	var latlng = new google.maps.LatLng(latitude, longitude);
	var optionsMap = {
		zoom : 15,
		center : latlng,
		mapTypeId : google.maps.MapTypeId.HYBRID
	};
	map = new google.maps.Map(document.getElementById(idMapCanvas), optionsMap);

	var optionsCircle = {
		center : latlng,
		map : map,
		radius : parseInt(accuracy),
		clickable : false,
		fillColor : "#00AAFF",
		fillOpacity : 0.3,
		strokeColor : "#057CB8",
		strokeOpacity : 0.8,
		strokeWeight : 1
	};
	var circle = new google.maps.Circle(optionsCircle);

	var infowindow = new google.maps.InfoWindow();
	infowindow.setContent(latitude + ", " + longitude);

	var optionsMarker = {
		position : latlng,
		flat : true,
		title : latlng.toString(),
		map : map
	};
	var marker = new google.maps.Marker(optionsMarker);
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});

}

var distances = new Array();

function calculateDistance(origin, destination, totalDestinations) {
	var directionsRequest = {origin: origin, destination: destination.coords, unitSystem: google.maps.DirectionsUnitSystem.METRIC, 
		travelMode: google.maps.DirectionsTravelMode.WALKING};
	var directionsService = new google.maps.DirectionsService();
	directionsService.route(directionsRequest, onSuccessDirectionsService);

	function onSuccessDirectionsService(directionsResult, directionsStatus) {
		if (directionsStatus == google.maps.DirectionsStatus.OK) {
			var result = destination.name + ": " + directionsResult.routes[0].legs[0].distance.text;

			distances.push({result: result, value: directionsResult.routes[0].legs[0].distance.value, 
					destination: destination});
			if (distances.length == totalDestinations)
				shortestDistance(distances);
		} else
			alert(directionsStatus);
	}
}

function shortestDistance(distances) {
	var shortestDistance = distances.sort(sortDistances)[0];
	alert(shortestDistance.result);
	var latlng = shortestDistance.destination.coords;

	var optionsMarker = {
		position : latlng,
		flat : true,
		title : latlng.toString(),
		map : map
	};
	var marker = new google.maps.Marker(optionsMarker);


}

function sortDistances(a, b) {
	return a.value - b.value;
}

function nearestPoint(latitude, longitude) {
	var origin = new google.maps.LatLng(latitude, longitude);
	var destinations = [{name: "Avantic", coords: new google.maps.LatLng("28.46248389570779", "-16.293938564418")}, 
						{name: "El Corte Inglés", coords: new google.maps.LatLng("28.460061", "-16.253554")}, 
						{name: "Las Teresitas", coords: new google.maps.LatLng("28.507202", "-16.189342")},
						{name: "Parque Boulevard", coords: new google.maps.LatLng("28.470842", "-16.251496")}
					   ];

	for (i = 0; i < destinations.length; i++)
		calculateDistance(origin, destinations[i], destinations.length);
}