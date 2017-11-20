/**
 * Author : Aung Htet Maung
 * Date: 4th November 2017
 */
 $( document ).ready(function() {
	route_list = [];
	storeLoc = [];
      map = '';
      mapPro = '';
      var markers = [];
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var labelIndex = 0;
      var service ;
      var src = '';
      var flightPath  = '';
       $('#somecomponent').locationpicker({
            enableAutocomplete: true,
                enableReverseGeocode: true,
              radius: 0,
              inputBinding: {
                latitudeInput: $('#somecomponent-lat'),
                longitudeInput: $('#somecomponent-lon'),
                radiusInput: $('#somecomponent-radius'),
                locationNameInput: $('#somecomponent-address')
              },
              onchanged: function (currentLocation, radius, isMarkerDropped) {
                var addressComponents = $(this).locationpicker('map').location.addressComponents;
                //console.log(currentLocation);  //latlon
                updateControls(addressComponents); //Data
                initialize();
                }
              
            });
            //Pano Mode
		    function initialize() {
		    	 var fenway = {lat: parseFloat($('#somecomponent-lat').val()), lng: parseFloat($('#somecomponent-lon').val())};
		    //	var fenway = {lat: 42.345573, lng: -71.098326};
		    //	console.log($('#somecomponent-lat').val().toPrecision()+','+$('#somecomponent-lon').val().toPrecision());
		    	var panorama = new google.maps.StreetViewPanorama(
		    			  document.getElementById('pano'), {
		    				  position: fenway,
		    				  pov: {
		    					  heading: 34,
		    					  pitch: 10
		    				  }
		    			  });
		    	  //map.setStreetView(panorama);
		      }
      
      
      		// Store pointed route
            $('#route_add').click(function () {
            	mapPro = new google.maps.Map(document.getElementById('somecomponent2'), {
                    zoom: 14,
                    center: {lat: 37.167436, lng: 138.92280500000004},
                    mapTypeId: 'terrain'
                  });
               storeCoordinate($('#somecomponent-lat').val(), $('#somecomponent-lon').val() , route_list);
               storeDataSet($('#somecomponent-lat').val(), $('#somecomponent-lon').val());
               labelIndex = 0;
               var request = {
            		    location: mapPro.getCenter(),
            		    radius: '500',
            		    query: $('#somecomponent-address').val()
            		  };
              service = new google.maps.places.PlacesService(mapPro);
               service.textSearch(request, callback);
               initialize();
           	lineDrawing();
           });
           $('#draw_route').click(function () {
        	   lineDrawing();
          });
           
           function lineDrawing(){
        	   map = new google.maps.Map(document.getElementById('somecomponent2'), {
                   zoom: 16,
                   center: {lat: 37.167436, lng: 138.92280500000004},
                   mapTypeId: 'terrain'
                 });
            flightPath  = new google.maps.Polyline({
             path: route_list,
             geodesic: true,
             strokeColor: '#FF0000',
             strokeOpacity: 1.0,
             strokeWeight: 2
            });
            flightPath.setMap(map);
            drop(route_list);
        	   
           }
            function updateControls(addressComponents) {
              //console.log(addressComponents);
            }

            function storeCoordinate(xVal, yVal, route_list) {
              var coverter = new google.maps.LatLng(xVal,yVal);
              route_list.push(coverter);
            }
            function storeDataSet(x,y){
            	console.log('sotre');
            	var myLoc = {
            			"log":x,
            			"lug":y
            	};
            	storeLoc.push(myLoc);
            	console.log(storeLoc);
            }
            function drop(route_list) {
                clearMarkers();
                for (var i = 0; i < route_list.length; i++) {
                  addMarkerWithTimeout(route_list[i], i * 200,i);
                }
              }
            
          function addMarkerWithTimeout(position, timeout, label) {
                  window.setTimeout(function() {
                  var marker  = new google.maps.Marker({
                      position: position,
                      map: map,
                      animation: google.maps.Animation.DROP,
                      label: labels[labelIndex++ % labels.length]
                    });
                  //alert(labelIndex);
                  marker.addListener('click', function() {
                      deleteApoint(marker);
                    });
                	  markers.push(
                     marker
                    );
                  }, timeout);
                  
                }
                function clearMarkers() {
                  for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                  }
                  markers = [];
                  labelIndex = 0;
                }
            function toggleBounce() {
              if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
              } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
              }
            }
            
            function callback(results, status) {
//            	  if (status == google.maps.places.PlacesServiceStatus.OK) {
//            	    var placeID  = results[0].place_id;
//            	    
//            	    src = "https://maps.googleapis.com/maps/api/streetview?size=300x300&location="
//            	    	+ $('#somecomponent-lat').val()  + "," + $('#somecomponent-lon').val()+ "&key=AIzaSyC51n-Mqgn7fbB3bV_4s_YWJIVno6LAZAk";
//            	    console.log(src)
//            	    //document.getElementById("medias").src = src;
//            	    $('#media').prepend('<img id='+placeID+' src='+src+' />')
//            	  }
            	  
            	}
            
            function deleteApoint(marker){
	            	for (var i = 0; i < route_list.length; i++) {
	            		if(route_list[i] == marker.position){
		            			route_list.splice(i,1);
		            			storeLoc.splice(i,1);
		            			flightPath.setMap(null);
		            		}
	            	}
	            	google.maps.event.trigger(map, 'resize');
	            	lineDrawing();
	            	
            }
            
            $("#googlePhotoLink").keydown(function (e) {

            	   if (e.which == 9){
            		   media.push($("#googlePhotoLink").val());
            		   writePhotoLink(media);
            		   $("#googlePhotoLink").val("");
            	   	e.preventDefault();
            	   	$("#googlePhotoLink").focus();
            	  
            	   }
            	});
            
            
 });