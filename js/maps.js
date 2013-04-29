(function(){
  //this is the initialization function
	FoodTruck.maps.init = init = function (){
		var map,
			currentLocation = new google.maps.LatLng(37.336, -121.89); 	
			mapOptions = {
	          zoom: 15,
	          center: currentLocation,
	          mapTypeId: google.maps.MapTypeId.HYBRID
	        };
	    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	    FoodTruck.location = currentLocation;
	    FoodTruck.map = map;
      FoodTruck.markers = {};

	}

  //this function sets the markers on the map initially
	FoodTruck.maps.setMarkers = setMarkers = function(query) {
		if (!query){
      console.log('No query specified');
      return;
    }
    FoodTruck.markers[query]=[];
    var currentLocation = FoodTruck.location,
			map = FoodTruck.map,
			markerIcons = {
				'Schools':'../img/school.png',
				'Parking':'../img/parking.png',
				'Companies':'../img/company.png'
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
		            	url: markerImg,
		            	size: new google.maps.Size(20,32)
		            },
		            title: obj.name
		        });
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
	init();

  ['Schools', 'Companies', 'Parking'].forEach(function(query){
    setMarkers(query);
  });

}());
