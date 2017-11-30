/**
 * Copy Right Aung Htet Maung 
 * under google license.
 */
var markersDetail = [];
var labelsDetail = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndexDetail = 0;
var divJson = {};
var route_list_Detail = [];
var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get("divId");
console.log(c);
//Global Packages
var packageArray = [];
var locationArray = [];
//Client ID and API key from the Developer Console
var CLIENT_ID = '24492359185-ejn0mks9fon7opvnnbrekb4n9kv6fli9.apps.googleusercontent.com';
var API_KEY = 'AIzaSyC51n-Mqgn7fbB3bV_4s_YWJIVno6LAZAk';

//Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

//Authorization scopes required by the API; multiple scopes can be
//included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

var divJson = {};
/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoadPackageDetail() {
	gapi.load('client:auth2', initClientLoadPackageDetail);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClientLoadPackageDetail() {
	gapi.client.init({
		apiKey: API_KEY,
		clientId: CLIENT_ID,
		discoveryDocs: DISCOVERY_DOCS,
		scope: SCOPES
	}).then(function () {
//		// Listen for sign-in state changes.
//		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

//		// Handle the initial sign-in state.
//		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//		authorizeButton.onclick = handleAuthClick;
//		signoutButton.onclick = handleSignoutClick;
		if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
			listMajorsDetail();
		}else {
			gapi.auth2.getAuthInstance().signIn();
		}
	});
}
/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajorsDetail() {
	gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: '1RV45LYAbP44VIyZHPOMW6iO7qHDivPqfxhSxylr5IRQ',
		range: 'A1:Z99',
	}).then(function(response) {
		var timeout = setTimeout(buildObjDetail(response),3000);
	}, function(response) {
		console.log('Error: ' + response.result.error.message);
	});
}


function buildObjDetail(response){
	var range = response.result;
	var imgUrl = '';
	var divId = '';
	var shortMsg = '';
	var title = '';
	var location = [];
	var aboutAuthor = '';
	var authorMail = '';
	var authorName = '';
	var longMsg = '';
	var authProPic = '';
	var authContact = '';
	var transport = '';
	var season = '';
	var locTamp = [];
	var postDate = '';
	var divSlideData = '';
	var divData = '';
	if (range.values.length > 0) {
		for (i = 0; i < range.values.length; i++) {
			var row = range.values[i];
			// Print columns A and E, which correspond to indices 0 and 4.
			if (row[0] == c){
				console.log('Data Found,');
				for (j = 0; j < row.length; j++) {

					switch(j) {
					//record id
					case 0: 
						divId = row[j];
						break;
						//LocationArray
					case 1:
						locTamp = row[j];
						console.log(row[j]);
						break;
						// Story
					case 2:
						longMsg =  row[j];
						if ( longMsg.length > 100)
							shortMsg = longMsg.substring(0, 99);
						shortMsg = longMsg;
						break;
						//img url
					case 3:
						imgUrl = BuiltJsonImg(row[j]);
						break;
						//About Author
					case 4:
						aboutAuthor =  row[j];
						break;
						//About Author email
					case 5:
						authorMail =  row[j];
						break;
						//About Author Name
					case 6:
						authorName =  row[j];
						break;
						//About Author Profile Pic
					case 7:
						authProPic =  row[j];
						break;
						//About Author Contact
					case 8:
						authContact =  row[j];
						break;
						//About Transportation
					case 9:
						transport =  row[j];
						break;
						//About Seasonal
					case 10:
						season =  row[j];
						break;
						//Title
					case 11:
						title =  row[j];
						break;
						//Post Date
					case 12:
						postDate =  row[j];
						break;
					}
				}
				//location.push(locTamp);
				divJson = {
						"divId":divId,
						"location" : JSON.parse(locTamp),
						"longMsg" : longMsg,
						"shortMsg" : shortMsg,
						"imgUrl" : imgUrl,
						"aboutAuthor" : aboutAuthor,
						"authorMail" : authorMail,
						"authorName" : authorName,
						"authProPic" : authProPic,
						"authContact" : authContact,
						"transport" : transport,
						"season" : transport,
						"title": title,
						"date" : postDate
				};
				console.log(divJson);
				htmlFactory(divJson)
				//document.getElementById("loader").style.display = "none";
			}
		}


	} else {
		console.log('No data found.');
	}
	for (k = 0; k < divJson.location.length; k++) {
		storeCoordinate( divJson.location[k].log,divJson.location[k].lug);
	}
	var timeout = setTimeout(drawMap(),3000);

	initializeDetailPano(parseFloat(divJson.location[0].log),parseFloat(divJson.location[0].lug));
}

function htmlFactory(dataString){
	var mainTag = document.getElementById('content');
	var sliderTag = document.getElementById('slider');

	divData = '<div class="row">';
	divData += '<div class="col-md-12">';
	divData += '<h2>';
	divData += dataString.title;
	divData += '</h2>';
	divData += '<p>';
	divData += dataString.longMsg;
	divData += '<br><br>';
	divData += '<b>Necessary Transportation are :</b>&nbsp;';
	divData += dataString.transport;
	divData += '</p>';

	divData += '<div></div><hr>';

	divData += '<div class="row">';
	divData += '<div class="col-md-4">';
	divData += '<b>Posted by :</b>';
	divData += dataString.authorName;
	divData += '&nbsp; <img src='+dataString.authProPic+' class="img-circle" id="authorPhotoTumb"></img>';
	divData += '<br>';
	divData += '</div>';
	divData += '<div class="col-md-4">'
	divData += '<b>Contact to blogger :</b>';
	divData += dataString.authorMail;
	divData += '<br>';
	divData += dataString.date;
	divData += '</div>';
	divData += '<div class="col-md-4">'
	divData += '<span><a target="_blank" class="fa faSocial fa-twitter" href="https://twitter.com/intent/tweet?text='+dataString.title+
			'&url=http://ews.iuj.ac.jp/i17/free/tourdurasa/postdetail.html?divId='+dataString.divId+
			'&via=SmartTourUrasa&'+
			'hashtags=Urasa%2CTravel%2CSmartTour&'+
			'" data-size="large">'
			+'</a>'+
			'<a target="_blank" id="F-'+dataString.divId+'" class="fa faSocial fa-facebook" data="https://www.facebook.com/dialog/share?quote='+dataString.title+'&href=http://ews.iuj.ac.jp/i17/free/tourdurasa/postdetail.html?divId='+dataString.divId+'&picture='+dataString.imgUrl+'&method=share&'+'hashtags=Urasa%2CTravel%2CSmartTour&app_id=1831840850374206"'+
			'data-size="large" onclick="SocialClick(this)">'+'</a>'+
			'</span>';
	divData += '</div></div></div></div>';

	divSlideData = '<div class="container">';
	divSlideData += '<div id="myCarousel" class="carousel slide" data-ride="carousel">';
//	<!-- Indicators -->
	divSlideData += '<ol class="carousel-indicators">';
	divSlideData += ' <li data-target="#myCarousel" data-slide-to="0" class="active"></li>';
	divSlideData += '<li data-target="#myCarousel" data-slide-to="1"></li>';
	divSlideData += '<li data-target="#myCarousel" data-slide-to="2"></li>';
	divSlideData += ' </ol>';

//	<!-- Wrapper for slides -->
	divSlideData += '<div class="carousel-inner">';
	
	for (var i = 0; i < dataString.imgUrl.links.length; i++) {
	if(i==0){
	divSlideData += ' <div class="item active">';
	divSlideData += '<img src="'+dataString.imgUrl.links[i]+'" alt="Los Angeles" style="width:100%;height:500px;overflow: hidden;">';
	divSlideData += '</div>';
	}else{
		divSlideData += ' <div class="item">';
		divSlideData += '<img src="'+dataString.imgUrl.links[i]+'" alt="Los Angeles" style="width:100%;height:500px;overflow: hidden;">';
		divSlideData += '</div>';
	}
	}
//	divSlideData += '<div class="item">';
//	divSlideData += '<img src="./img/aung.jpg" alt="Chicago" style="width:100%;">';
//	divSlideData += ' </div>';
//
//	divSlideData += '<div class="item">';
//	divSlideData += '<img src="./img/aung.jpg" alt="New york" style="width:100%;">';
//	divSlideData += '</div>';
	
	
	divSlideData += '</div>';

//	<!-- Left and right controls -->
	divSlideData += '<a class="left carousel-control" href="#myCarousel" data-slide="prev">';
	divSlideData += ' <span class="glyphicon glyphicon-chevron-left"></span>';
	divSlideData += ' <span class="sr-only">Previous</span>';
	divSlideData += '</a>';
	divSlideData += '<a class="right carousel-control" href="#myCarousel" data-slide="next">'
		divSlideData += '<span class="glyphicon glyphicon-chevron-right"></span>';
	divSlideData += '<span class="sr-only">Next</span>';
	divSlideData += '</a>';
	divSlideData += '</div>';
	divSlideData += '</div>';

	sliderTag.innerHTML += divSlideData;
	mainTag.innerHTML += divData;
}
function loadMyFunction() {
	myVar = setTimeout(showPage, 3000);
}
function storeCoordinate(xVal, yVal) {
	var coverter = new google.maps.LatLng(xVal,yVal);
	route_list_Detail.push(coverter);
}
//Pano Mode
function initializeDetailPano(lat, lng) {
	var fenway = {lat: lat, lng: lng};
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
} 

function drawMap(){
	map = new google.maps.Map(document.getElementById('somecomponent2'), {
		zoom: 16,
		center: {lat: parseFloat(divJson.location[0].log) , lng: parseFloat(divJson.location[0].lug)},
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
	drop(route_list_Detail);
}
function drop(route_list) {
	clearMarkers();
	for (var i = 0; i < route_list_Detail.length; i++) {
		addMarkerWithTimeout(route_list_Detail[i], i * 200,i);
	}
}
function clearMarkers() {
	for (var i = 0; i < markersDetail.length; i++) {
		markersDetail[i].setMap(null);
	}
	markersDetail = [];
	labelIndexDetail = 0;
}
function addMarkerWithTimeout(position, timeout, label) {
	window.setTimeout(function() {
		var marker  = new google.maps.Marker({
			position: position,
			map: map,
			animation: google.maps.Animation.DROP,
			label: labelsDetail[labelIndexDetail++ % labelsDetail.length]
		});
		//alert(labelIndex);
		marker.addListener('click', function() {
			//Pano Pya Yan
			//console.log(marker.position);
			initializeDetailPanoPosition(marker.position);

		});

	}, timeout);

}
function initializeDetailPanoPosition(pos) {
	//var fenway = {lat: lat, lng: lng};
	//	var fenway = {lat: 42.345573, lng: -71.098326};
	//	console.log($('#somecomponent-lat').val().toPrecision()+','+$('#somecomponent-lon').val().toPrecision());
	var panorama = new google.maps.StreetViewPanorama(
			document.getElementById('pano'), {
				position: pos,
				pov: {
					heading: 34,
					pitch: 10
				}
			});
}
function imgArrayToJson(datastring){
	var obj = { "links": datastring};
	//console.log(obj);
	return obj;
}
function BuiltJsonImg(dataString){
	var step1 = toArrayS(dataString);
	var step2 = imgArrayToJson(step1);
	return step2;
}
function toArrayS(datastring) {
	var res = [];
    res = datastring.split(",");
    return res;
}
function StoryTrimer(data){
	step1 = data.split(" ",100);
	return step1.join(" ");
}
function SocialClick(a){
	  var linkTag = a;
	  var x = a.getAttribute("data");
	   //console.log(getParameterByName('app_id',x));
	  var listOfPic = divJson.imgUrl.links;
	  var photo = listOfPic[0];
	  console.log(listOfPic);
	   FB.ui(
			   {
			   method: 'share_open_graph',
			   action_type: 'og.shares',
			   action_properties: JSON.stringify({
		             // object : createJsonForFB(x)
				   object : {
		                 'og:url': getParameterByName('href',x),
		                 'og:title': 'SmartTravel',
		                 'og:description': getParameterByName('quote',x),
		                 'og:image:width': '1000',
		                 'og:image:height': '960',
		                 'og:image': photo
		              }
		          }),
//			   name: 'DebugmodeEventPlans',
//			   link: getParameterByName('href',x),
//			   caption: 'SmartTravel',
//			   description: getParameterByName('quote',x),
//			   picture:  getParameterByName('picture',x),
//			   appId: getParameterByName('app_id',x)
			   });
}

function createJsonForFB(data){
 var fbJson =	{
		'og:image':'',
       'og:url': getParameterByName('href',data),
       'og:title': 'SmartTravel',
       'og:description': getParameterByName('quote',data),
       'og:og:image:width': '2560',
       'og:image:height': '960'
	};
var obj = JSON.parse(fbJson);
 for (var i = 0; i < divJson.imgUrl.links.length; i++) {
	 obj['og:image'].push(divJson.imgUrl.links[i]);
	 
 }
 return obj;
}
function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}