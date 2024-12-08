$(document).ready(function(){

	"use strict";
	
	
	/* =================================
	BANNER ROTATOR IMAGE 
	=================================== */
	var slide = $('.carousel-inner .item');
	slide.each(function(){
		var src = $(this).find('img').attr('src');
		$(this).css('background-image', 'url(' + src + ')');
	});

	/* =================================
	LOADER 
	=================================== */
	$(".loader").delay(400).fadeOut();
    $(".animationload").delay(400).fadeOut("fast");
	
	
	/* =================================
	NAVBAR 
	=================================== */
	jQuery(window).scroll(function () {
		var top = jQuery(document).scrollTop();
		var batas = jQuery(window).height();

		if (top > batas) {
			jQuery('.navbar-main').addClass('stiky');
		} else {
			jQuery('.navbar-main').removeClass('stiky'); 
		}
	});
	
	
	/* =================================
	VERTICLE TEXT 
	=================================== */
	var current = 1; 
	var height = $('.info-item').height(); 
	var numberDivs = $('.info-item').children().length; 
	var first = $('.info-item div:nth-child(1)'); 
	setInterval(function() {
		var number = current * -height;
		first.css('margin-top', number + 'px');
		if (current === numberDivs) {
			first.css('margin-top', '0px');
			current = 1;
		} else current++;
	}, 5000);
	
	
	
	/* =================================
	OWL CAROUSEL
	=================================== */
	
	// Home - Shop
	var shop = $("#shop-caro");
	shop.owlCarousel({
		singleItem : true,
		autoPlay : 5000,
		pagination : false
	});
	
	// Home - Our Player
	var player = $("#player-caro");
	player.owlCarousel({
		items : 4,
		itemsMobile : [479,1],
		pagination : true,
		afterInit: playerInit
	});
	
	function playerInit(){
		$('#player-caro .owl-controls .owl-page').append('<a class="item-link"/>');
		var pafinatorsLink = $('#player-caro .owl-controls .item-link');
		$('#player-caro .owl-controls').prependTo('.player-pagination');
		$.each(this.owl.userItems, function (i) {
			$(pafinatorsLink[i]).text( i+1 );
		});
	}
	
	// About - Welcome
	var about = $("#about-caro");
	about.owlCarousel({
		singleItem : true,
		autoPlay : 5000,
		pagination : true
	});

	// About - History
	var history = $("#history-caro");
	history.owlCarousel({
		singleItem : true,
		pagination : true,
		afterInit: historyInit
	});
	
	function historyInit(){
		$('.history-caro .owl-controls .owl-page').append('<a class="item-link"/>');
		var pafinatorsLink = $('.history-caro .owl-controls .item-link');
		$('.history-caro .owl-controls').appendTo('.nav-history');
		$.each(this.owl.userItems, function (i) {
			$(pafinatorsLink[i]).text( $(this).find('.title').attr('data-year') );
		});
	}
	
	// Team - Primary
	var teams = $("#primary-team-caro");
	teams.owlCarousel({
		singleItem : true,
		pagination : false
	});
 
	var tom = $('#primary-nav .position');
	tom.each(function(e){
		$(this).on('click', function(){
			teams.trigger('owl.goTo', e);
			$(this).addClass('active').siblings().removeClass('active');
		});
	});
		  
	// Team - Secondary
	var teams2 = $("#secondary-team-caro");
	teams2.owlCarousel({
		singleItem : true,
		pagination : false
	});
 
	var tom2 = $('#secondary-nav .position');
	tom2.each(function(e){
		$(this).on('click', function(){
			teams2.trigger('owl.goTo', e);
			$(this).addClass('active').siblings().removeClass('active');
		});
	});

	// Team - Third
	var teams3 = $("#third-team-caro");
	teams3.owlCarousel({
		singleItem : true,
		pagination : false
	});
 
	var tom3 = $('#third-nav .position');
	tom3.each(function(e){
		$(this).on('click', function(){
			teams3.trigger('owl.goTo', e);
			$(this).addClass('active').siblings().removeClass('active');
		});
	});

	// Team - fourth
	var teams4 = $("#fourth-team-caro");
	teams4.owlCarousel({
		singleItem : true,
		pagination : false
	});
 
	var tom4 = $('#fourth-nav .position');
	tom4.each(function(e){
		$(this).on('click', function(){
			teams4.trigger('owl.goTo', e);
			$(this).addClass('active').siblings().removeClass('active');
		});
	});
	
	
	
	/* =================================
	FAQ
	=================================== */
	$('.panel-heading a').on('click', function() {
		$('.panel-heading').removeClass('active');
		$(this).parents('.panel-heading').addClass('active');
	});
	
	
	
	/* =================================
	MAGNIFIC POPUP
	=================================== */
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1]
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
			  return item.el.attr('title') + '';
			}
		}
	});
	
	/* =================================
	CONTACT FORM
	=================================== */

	

    

    
	
	
	
	/* =================================
	GOOGLE MAPS
	=================================== */

	function CustomZoomControl(controlDiv, map) {
		//grap the zoom elements from the DOM and insert them in the map
		var controlUIzoomIn= document.getElementById('cd-zoom-in'),
			controlUIzoomOut= document.getElementById('cd-zoom-out');
		controlDiv.appendChild(controlUIzoomIn);
		controlDiv.appendChild(controlUIzoomOut);

		// Setup the click event listeners and zoom-in or out according to the clicked element
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
			map.setZoom(map.getZoom()+1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
			map.setZoom(map.getZoom()-1)
		});
	}

	if ($('#maps').length) {
	//set your google maps parameters
	var myLat = $('#maps').data('lat'),
	myLng = $('#maps').data('lng');

	
	var latitude = myLat,
		longitude = myLng,
		map_zoom = 14;

	//google map custom marker icon - .png fallback for IE11
	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	var marker_url = ( is_internetExplorer11 ) ? 'images/cd-icon-location.png' : 'images/cd-icon-location.svg';

	//define the basic color of your map, plus a value for saturation and brightness
	var main_color = '#000000',
		saturation_value= -80,
		brightness_value= 5;

	//we define here the style of the map
	var style= [
		{
			//set saturation for the labels on the map
			elementType: "labels",
			stylers: [
				{saturation: saturation_value}
			]
		},
		{ //poi stands for point of interest - don't show these lables on the map
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show highways lables on the map
			featureType: 'road.highway',
			elementType: 'labels',
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show local road lables on the map
			featureType: "road.local",
			elementType: "labels.icon",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show arterial road lables on the map
			featureType: "road.arterial",
			elementType: "labels.icon",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show road lables on the map
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "off"}
			]
		},
		//style different elements on the map
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" },
				{ lightness: brightness_value },
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" },
				{ lightness: brightness_value },
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.government",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" },
				{ lightness: brightness_value },
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.sport_complex",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" },
				{ lightness: brightness_value },
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.attraction",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" },
				{ lightness: brightness_value },
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.business",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" },
				{ lightness: brightness_value },
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" },
				{ lightness: brightness_value },
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" },
				{ lightness: brightness_value },
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "landscape",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" },
				{ lightness: brightness_value },
				{ saturation: saturation_value }
			]

		},
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" },
				{ lightness: brightness_value },
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" },
				{ lightness: brightness_value },
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" },
				{ lightness: brightness_value },
				{ saturation: saturation_value }
			]
		}
	];

	//set google map options
	var map_options = {
		center: new google.maps.LatLng(latitude, longitude),
		zoom: map_zoom,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		styles: style,
	}
	//inizialize the map
	var map = new google.maps.Map(document.getElementById('maps'), map_options);
	//add a custom marker to the map
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(latitude, longitude),
		map: map,
		visible: true,
		icon: marker_url,
	});

	var zoomControlDiv = document.createElement('div');
	var zoomControl = new CustomZoomControl(zoomControlDiv, map);

	//insert the zoom div on the top left of the map
	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
  }
	
	
	
	
	


    
	
	
	
});




  
  