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
    var $eItem = $(e.target).closest('li'),
        data = $(e.target).text().trim();
    if ($eItem.hasClass('expand-list'))
        return; 
  	$eItem.find('i').toggleClass('icon-ok');
    if ($eItem.parent().hasClass('map-filters')) {
      FoodTruck.maps.toggleMarkers($eItem.text());
    } else {
      console.log('we are going to send `'+data+'` through GET request to the server');
      $.get('../server/getdata.java',{
        query: data
      }, function(data) {
        console.log('server has returned data shown below');
        console.log(data);
      }).fail(function(){
        console.log('ERROR: Bad/No response from server');
      });
      e.stopPropagation();
    }
    
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
    $('.sub-list-wrapper').show();
  }
 FoodTruck.application.handler= handler= function(event){
    var $target =$(event.target);
    if($target.is("li")){
      $target.children().toggle();
    }
  }
  
  FoodTruck.application.showSubList = showSubList = function(e){
    var $target = $(e.target).closest('li');
    $target.children('.sub-list').toggle();

  }

  FoodTruck.application.responsiveMap = responsiveMap = function(){
    console.log('Current width is: '+document.width+'px');
    if (document.width < 1025) {
      $('#map-canvas').css('width','480px');
    } else if($('#map-canvas').css('width') !='600px') {
      $('#map-canvas').css('width','600px');
    }
  }

  //$("display-list").click(handler).find("display-list").hide();

  //FoodTruck.application.display-handlers=display-handlers=function(h){
   // var $HItem = $(h.target).closest('li');
   // $HItem.find('i').toggleClass('icon-ok');
    

  //}

  //init function called
  initUserLogin();
  $('ul.sub-list').hide();

  //event handlers below
  $('.expand-list').on('click',showSubList);
  $('ul.selection-list').on('click','li',handleFilters);
  $('button#login-user').on('click',logMeIn);
  $('a[class="user-logout"]').on('click',logMeOut);
  $(window).on('resize',responsiveMap);
  //$('ul.display-list').on('click','ul',handleFilters);
  //$('display-list.list1').on('click','li',handleFilters);


}());