/**
 * Copy Right Aung Htet Maung 
 * under google license.
 */


// Global Packages
	var packageArray = [];
// Client ID and API key from the Developer Console
      var CLIENT_ID = '24492359185-ejn0mks9fon7opvnnbrekb4n9kv6fli9.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyC51n-Mqgn7fbB3bV_4s_YWJIVno6LAZAk';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoadPackage() {
        gapi.load('client:auth2', initClientLoadPackage);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClientLoadPackage() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
//          // Listen for sign-in state changes.
//          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
//
//          // Handle the initial sign-in state.
//          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//          authorizeButton.onclick = handleAuthClick;
//          signoutButton.onclick = handleSignoutClick;
        	if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        		listMajors();
        	}else {
        		gapi.auth2.getAuthInstance().signIn();
              }
        });
      }

      /**
       * Print the names and majors of students in a sample spreadsheet:
       * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       */
      function listMajors() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1RV45LYAbP44VIyZHPOMW6iO7qHDivPqfxhSxylr5IRQ',
          range: 'A1:Z99',
        }).then(function(response) {
        		var timeout = setTimeout(buildDiv(response),3000);
        }, function(response) {
        		console.log('Error: ' + response.result.error.message);
        });
      }
      
      
      function buildList(divParam,divId){
    	  	var mainTag = document.getElementById('packageContainer');
    	  		mainTag.innerHTML += divParam;
    	  		
    	  		
      }
      
      function buildDiv(response){
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
    	  var locTamp = '';
          if (range.values.length > 0) {
            for (i = range.values.length-1; i >= 0 ; i--) {
              var row = range.values[i];
              //console.log(row);
              // Print columns A and E, which correspond to indices 0 and 4.
              for (j = 0; j < row.length; j++) {
            	  
            	  switch(j) {
            	  	//record id
            	  	case 0: 
            	  		divId = row[j];
            	  		break;
            	  		//LocationArray
            	  	case 1:
            	  		locTamp = row[j];
            	  		locTamp = locTamp.replace(/\(/g, "[");
            	  		locTamp = locTamp.replace(/\)/g, "]");
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
            	  }
              }
              //location.push(locTamp);
              var divJson = {
            		  "divId":divId,
            		  "location" : locTamp,
            		  "longMsg" : longMsg,
            		  "shortMsg" : shortMsg,
            		  "imgUrl" : imgUrl,
            		  "aboutAuthor" : aboutAuthor,
            		  "authorMail" : authorMail,
            		  "authorName" : authorName,
            		  "authProPic" : authProPic,
            		  "authContact" : authContact,
            		  "transport" : transport,
            		  "season" : transport
              };
              packageArray.push(divJson);
              console.log(divJson);
              var htmlFatory = '';
              htmlFatory += '<div class="row" id="div-'+divId+'">';
              htmlFatory += '<div class="col-md-7">';
              htmlFatory += '<img class="img-fluid img-responsive img-rounded mb-6 mb-md-0" src="'+imgUrl.links[0]+'" alt="'+title+'">';
              htmlFatory += '</div>';
              htmlFatory += '<div class="col-md-5">';
              htmlFatory += '<h3>'+title+'</h3>';
              htmlFatory += '<span class="fa fa-star checked"></span>';
              htmlFatory += '<span class="fa fa-star checked"></span>';
              htmlFatory += '<span class="fa fa-star checked"></span>';
              htmlFatory += '<span class="fa fa-star checked"></span>';
              htmlFatory += '<span class="fa fa-star checked"></span>';
              htmlFatory += '<p class= "card-body">'+StoryTrimer(shortMsg)+'......</p>';
              htmlFatory += '<a class="btn btn-primary" href="./postdetail.html?divId='+divId+'" id="'+divId+'">Read More..</a>';
              htmlFatory += '<span><a target="_blank" class="fa faSocial fa-twitter" href="https://twitter.com/intent/tweet?text='+title+
              				'&url=http://ews.iuj.ac.jp/i17/free/tourdurasa/postdetail.html?divId='+divId+
              				'&via=TripIt&'+
              				'hashtags=Urasa%2CTravel%2CSmartTour%2CTripIt&'+
              				'" data-size="large">'
              				+'</a>'+
              				'<a target="_blank" id="F-'+divId+'" class="fa faSocial fa-facebook" data="https://www.facebook.com/dialog/share?quote='+title+'&href=http://ews.iuj.ac.jp/i17/free/tourdurasa/postdetail.html?divId='+divId+'&picture='+imgUrl.links[0]+'&method=share&'+'hashtags=Urasa%2CTravel%2CSmartTour&app_id=1831840850374206"'+
              				'data-size="large" onclick="SocialClick(this)">'+'</a>'+
              				'</span>';
              htmlFatory += '</div>';
              htmlFatory += '</div><hr>';
              htmlFatory += '<style>.img-fluid {width: 600px;height: 300px;} @media (max-width: 768px) {.img-fluid{width: 300px;height: 200px;}}</style>'
              buildList(htmlFatory,divId);
              document.getElementById("loader").style.display = "none";
            }
            
          } else {
        	  	console.log('No data found.');
          }
    	  
      }
      function loadMyFunction() {
    	    myVar = setTimeout(showPage, 3000);
    	}
//      <!-- Project One -->
//      <div class="row">
//        <div class="col-md-7">
//          <a href="#">
//            <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">
//          </a>
//        </div>
//        <div class="col-md-5">
//          <h3>Project One</h3>  
//          	<span class="fa fa-star checked"></span>
//			<span class="fa fa-star checked"></span>
//			<span class="fa fa-star checked"></span>
//			<span class="fa fa-star checked"></span>
//			<span class="fa fa-star checked"></span>
//          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.</p>
//          <a class="btn btn-primary" href="#">View Project</a>
//        </div>
//      </div>
//      <!-- /.row -->
//
//      <hr>
      
      function SocialClick(a){
    	  var linkTag = a;
    	  var x = a.getAttribute("data");
    	  var listOfPic = getParameterByName('picture',x)
   	   console.log(listOfPic);
    	   FB.ui(
    			   {
    			   method: 'share_open_graph',
    			   action_type: 'og.shares',
    			   action_properties: JSON.stringify({
    		              object : {
    		                 'og:url': getParameterByName('href',x),
    		                 'og:title': 'TripIt',
    		                 'og:description': getParameterByName('quote',x),
    		                 'og:og:image:width': '2560',
    		                 'og:image:height': '960',
    		                 'og:image': listOfPic
    		              }
    		          }),
//    			   name: 'DebugmodeEventPlans',
//    			   link: getParameterByName('href',x),
//    			   caption: 'SmartTravel',
//    			   description: getParameterByName('quote',x),
//    			   picture:  getParameterByName('picture',x),
//    			   appId: getParameterByName('app_id',x)
    			   });
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
      function toArrayS(datastring) {
    		var res = [];
    	    res = datastring.split(",");
    	    return res;
    	}
      function imgArrayToJson(datastring){
    	  var obj = { "links": datastring};
    	  console.log(obj);
    	  return obj;
      }
      function BuiltJsonImg(dataString){
    	   var step1 = toArrayS(dataString);
    	   var step2 = imgArrayToJson(step1);
    	   return step2;
      }
      function StoryTrimer(data){
    	  	step1 = data.split(" ",100);
    	  	return step1.join(" ");
      }
     