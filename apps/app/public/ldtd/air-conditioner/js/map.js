
$(document).ready(function()
{
	"use strict";

	var map;

	initGoogleMap();

	function initGoogleMap()
	{
		var myLatlng = new google.maps.LatLng(40.7127753, -74.0059728);
    	var mapOptions = 
    	{
    		center: myLatlng,
	       	zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			overviewMapControl: true,
			draggable: true,
			scrollwheel: false,
			zoomControl: true,
			zoomControlOptions:
			{
				position: google.maps.ControlPosition.RIGHT_BOTTOM
			},
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: true,
			styles:
			[
				{
				"elementType": "geometry",
				"stylers": [
				  {
				    "color": "#f5f5f5"
				  }
				]
				},
				{
				"elementType": "labels.icon",
				"stylers": [
				  {
				    "visibility": "on"
				  }
				]
				},
				{
				"elementType": "labels.text",
				"stylers": [
				  {
				    "color": "#858585"
				  }
				]
				},
				{
				"elementType": "labels.text.fill",
				"stylers": [
				  {
				    "color": "#858585"
				  }
				]
				},
				{
				"elementType": "labels.text.stroke",
				"stylers": [
				  {
				    "color": "#f5f5f5"
				  }
				]
				},
				{
				"featureType": "administrative.land_parcel",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
				    "color": "#bdbdbd"
				  }
				]
				},
				{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
				  {
				    "color": "#eeeeee"
				  }
				]
				},
				{
				"featureType": "poi",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
				    "color": "#757575"
				  }
				]
				},
				{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [
				  {
				    "color": "#e5e5e5"
				  }
				]
				},
				{
				"featureType": "poi.park",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
				    "color": "#9e9e9e"
				  }
				]
				},
				{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
				  {
				    "color": "#ffffff"
				  }
				]
				},
				{
				"featureType": "road.arterial",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
				    "color": "#757575"
				  }
				]
				},
				{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
				  {
				    "color": "#dadada"
				  }
				]
				},
				{
				"featureType": "road.highway",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
				    "color": "#616161"
				  }
				]
				},
				{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
				    "color": "#ffffff"
				  }
				]
				},
				{
				"featureType": "transit.line",
				"elementType": "geometry",
				"stylers": [
				  {
				    "color": "#e5e5e5"
				  }
				]
				},
				{
				"featureType": "transit.station",
				"elementType": "geometry",
				"stylers": [
				  {
				    "color": "#eeeeee"
				  }
				]
				},
				{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
				  {
				    "color": "#c9c9c9"
				  }
				]
				},
				{
				"featureType": "water",
				"elementType": "geometry.fill",
				"stylers": [
				  {
				    "color": "#ededed"
				  }
				]
				},
				{
				"featureType": "water",
				"elementType": "labels.text.fill",
				"stylers": [
				  {
				    "color": "#9e9e9e"
				  }
				]
				}
				]
    	}

    	// Initialize a map with options
    	map = new google.maps.Map(document.getElementById('map'), mapOptions);

    	// Use an image for a marker
		var image = 'images/location.png';
		var marker = new google.maps.Marker(
		{
			position: myLatlng,
			map: map,
			icon: image
		});
   
		// Re-center map after window resize
		google.maps.event.addDomListener(window, 'resize', function()
		{
			setTimeout(function()
			{
				google.maps.event.trigger(map, "resize");
				map.setCenter(myLatlng);
			}, 1500);
		});
	}
});