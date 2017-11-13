//Aung Htet Maung All Rights Reserved

$( document ).ready(function() {
	function faClick(id){
		font = parseInt($('#'+id).css('font-size'));
		//alert(font < 90);
		if ( font< 50){
			$('#'+id).css({'font-size':60,
				'border-color':'green'});

		}
		else{
			$('#'+id).css({'font-size':48, 
				'border-color':'white'});

		}

	}

	$('#goToGoogle').click(function (){
		window.open('https://www.google.co.jp/maps/place/Urasa,+Minamiuonuma,+Niigata+Prefecture+949-7302/@37.1634968,138.9253371,3a,75y,90t/data=!3m8!1e2!3m6!1shttp:%2F%2Fa2.cdn.japantravel.com%2Fphoto%2F2804-17131%2F800%2Fphoto.jpg!2e7!3e27!6s%2F%2Flh5.googleusercontent.com%2Fproxy%2F6wP6VYzU-dKz756p0VrYsjryNKY75Nowp2yoCDr8n5LmwyevliYgKHrTPKRH0kjSyTyRj8KxqQsHNcBU9bSm92hLwjDYwSEdmaSdCvDY5rmGULEBcLfCE9phHmNl8zhenuecZK7X2YRznTCQfSGJlSdgRTygoQ%3Dw156-h208-k-no!7i800!8i1066!4m5!3m4!1s0x5ff59261bc492ae3:0x8c5ae5092ce2eb1f!8m2!3d37.1684626!4d138.9200786')
	});	
	
});