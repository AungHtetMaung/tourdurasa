/**
 * Author : Aung Htet Maung
 * Date: 4th November 2017
 */

$( document ).ready(function() {

//	valueRangeBody = '';
	rowIdSheet = ''; 
	var monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
		];
	var d = new Date();

	$('#submit').click(function () {
		//alert('Drive');
		funnySerial();
		handleClientLoadSheet();
	});
	function handleClientLoadSheet() {
        gapi.load('client:auth2', initClient);
      }
	function funnySerial(){
		var randomnumber = Math.ceil(Math.random()*1000)
		if(randomnumber > -1)
			rowIdSheet = monthNames[d.getMonth()] +'-'+ randomnumber + d.getSeconds();
	}

	
});

