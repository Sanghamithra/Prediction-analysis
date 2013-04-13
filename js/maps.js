(function(){
	var Maps = {};
	console.log('here');
	function init(){
		var map,
			myLatlng = new google.maps.LatLng(-25.363882,131.044922); 	
			mapOptions = {
	          zoom: 8,
	          center: new google.maps.LatLng(-34.397, 150.644),
	          mapTypeId: google.maps.MapTypeId.ROADMAP
	        };
	    map = new google.maps.Map(document.getElementById('map-canvas'),
	            mapOptions);
	    var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Hello World!'
        });
	}
	init();
}());
