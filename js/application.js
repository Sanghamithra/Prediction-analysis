(function(){
  FoodTruck.application.handleFilters = handleFilters = function(e) {
    var $eItem = $(e.target).closest('li');
  	$eItem.find('i').toggleClass('icon-ok');
    FoodTruck.maps.toggleMarkers($eItem.text());
  }

  $('ul.selection-list').on('click','li',handleFilters);
}());