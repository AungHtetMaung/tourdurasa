//Aung Htet Maung All Rights Reserved


var tranAvai = [];
function faClick(id){
	font = parseInt($('#'+id).css('font-size'));
	if ( font< 50){
		tranAvai.push(id);
		$('#'+id).css({'font-size':60,
			'border-color':'green'});
	}
	else{
		for (var i = 0; i < tranAvai.length; i++) {
			if(tranAvai[i] == id){
				tranAvai.splice(i,1);
			}
		}
		$('#'+id).css({'font-size':48, 
			'border-color':'white'});
	}
	console.log(tranAvai);
}