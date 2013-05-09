(function(){
  //this is the initialization function
	FoodTruck.markers = {};
	
  FoodTruck.maps.initialize = initialize = function (varlat,varlon)
	{
//		alert("hi");
		var latitude=varlat;
		var longitude=varlon;
    var marker;
		//alert("latitude: " + latitude);
		//alert("longitude: " + longitude);
		
		var newlocation=new google.maps.LatLng(latitude, longitude);
		var mapOptions = {
						  center:newlocation,
						  zoom:15,
						  mapTypeId:google.maps.MapTypeId.ROADMAP
		                 };
		var map=new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
    var marker = new google.maps.Marker({
	       position: newlocation,
	       map: map
	    });
    FoodTruck.location = newlocation;
    FoodTruck.map = map;
    FoodTruck.destMarker = new google.maps.Marker({
         position: newlocation,
         map: map
      });
    FoodTruck.destMarker.setVisible(false);
    setAllMarkers();
    initializeAutoComplete();

	}

  FoodTruck.initializeAutoComplete = initializeAutoComplete = function () {
    var input = document.getElementById('search-query');
    var currentLocation = FoodTruck.newLocation || FoodTruck.location,
        map = FoodTruck.map,
        options = {
          location: currentLocation,
          types: ['(regions)']
        },
    infoWindow = new google.maps.InfoWindow();

    FoodTruck.autocomplete = autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo('bounds', map);
    
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace(),
          destMarker = FoodTruck.destMarker;
      if (! place ) {
        // Inform the user that a place was not found and return.
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        // Use the viewport if it is provided.
        map.fitBounds(place.geometry.viewport);
      } else {
        // Otherwise use the location and set a chosen zoom level.
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      // map.setZoom(8);
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      destMarker.setIcon(image);
      destMarker.setPosition(place.geometry.location);
      // infoWindow.setContent(place.name);
      // infoWindow.open(map, destMarker);
      destMarker.setVisible(true);
      FoodTruck.newLocation = place.geometry.location;
      setAllMarkers();
    });

  }
	
	/*FoodTruck.maps.init = init = function (){
		var map,
			currentLocation = new google.maps.LatLng(37.336, -121.89); 	
			mapOptions = {
	          zoom: 15,
	          center: currentLocation,
	          mapTypeId: google.maps.MapTypeId.ROADMAP
	        };
	    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	    FoodTruck.location = currentLocation;
	    FoodTruck.map = map;
      FoodTruck.markers = {};

	}
*/
  //this function sets the markers on the map initially
	FoodTruck.maps.setMarkers = setMarkers = function(query) {
		if (!query){
      console.log('No query specified');
      return;
    }
    FoodTruck.markers[query]=[];
    var currentLocation = FoodTruck.newLocation || FoodTruck.location,
			map = FoodTruck.map,
			markerIcons = {
				'Schools':'/Prediction-analysis/img/school.png',
				'Parking':'/Prediction-analysis/img/parking.png',
				'Companies':'/Prediction-analysis/img/company.png'
			} 	
			request = {
				location: currentLocation,
				radius: '200',
				query: query  	
			};
		service = new google.maps.places.PlacesService(map);
    
    service.textSearch(request, function(data) {
			if (!(data instanceof Array)){
				console.log('ERROR: invalid response from server');
				return;
			}
      console.log(data);
			data.forEach(function(obj){
				 var markerImg = markerIcons[query] ||  markerIcons['Schools'];
				 //the second half of the or above puts schools marker as default incase markersIcons[query] is not found
 				 var marker = new google.maps.Marker({
		            position: obj.geometry.location,
		            map: map,
		            icon: {
		            	url: markerImg
		            },
		            title: obj.name
		        });
 				 marker.setVisible(false);
         FoodTruck.markers[query].push(marker);
			});
		});
	}

  //this switches markers on/off on the map based on the user selected filter
  FoodTruck.maps.toggleMarkers = toggleMarkers = function(query) {
    if (!FoodTruck.markers[query]) {
      console.log('marker does not exist');
      return;
    }
    FoodTruck.markers[query].forEach(function(marker){
      marker.getVisible() ? marker.setVisible(false) : marker.setVisible(true);
    });
  }

  //we initliaze the map and the markers below
  // var initiallatitude="37.336";
  // var initiallongitude="-121.89";
  // initialize(initiallatitude,initiallongitude);
  //initialize();

  FoodTruck.setAllMarkers = setAllMarkers = function() {
    ['Schools', 'Companies', 'Parking'].forEach(function(query){
      setMarkers(query);
    });
  }

  navigator.geolocation.getCurrentPosition(function(position){
    initialize(position.coords.latitude,position.coords.longitude);
  });


}());
