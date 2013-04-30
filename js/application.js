(function(){

  FoodTruck.application.initUserLogin = initUserLogin = function() {
  	var userName = Cookies.get('foodtruck-user'),
  		email = Cookies.get('foodtruck-user-email');
  	if (userName) {
  		$('.user-login-details .user-name').text(' You are logged in as '+userName);
  		$('.user-login-details .user-logout').text('LogOut');
  		$('.selection-list').show();
  	}
  	if (userName && email) {
  		$('.user-login-details .user-email').append('('+email+')');
  	}
  	//remove the above if loop if you want to remove email
  }

  FoodTruck.application.handleFilters = handleFilters = function(e) {
    var $eItem = $(e.target).closest('li');
  	$eItem.find('i').toggleClass('icon-ok');
    FoodTruck.maps.toggleMarkers($eItem.text());
  }

  FoodTruck.application.logMeIn = logMeIn = function() {
  	var userName = $('#user-name').val(),
  		email = $('#email').val();
  	if (!userName) {
  		$('#no-modal-error').show();
  		return;
  	}
  	Cookies.set('foodtruck-user',userName);
  	if (email) {
  		Cookies.set('foodtruck-user-email',email);
  	}
  	initUserLogin();
  	$('#sign-in-modal').modal('hide');

  }

  FoodTruck.application.logMeOut = logMeOut = function(){
  	Cookies.set('foodtruck-user','',{expires:-6000});
  	Cookies.set('foodtruck-user-email','',{expires:-6000});
  	$('.user-login-details span').empty();
  	$('.user-login-details a').empty();
  	$('.selection-list').hide();
  }

  //init function called
  initUserLogin();

  //event handlers below
  $('ul.selection-list').on('click','li',handleFilters);
  $('button#login-user').on('click',logMeIn);
  $('a[class="user-logout"]').on('click',logMeOut)
;
}());