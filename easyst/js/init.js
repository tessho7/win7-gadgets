$(function(){
	// 開始時、停止ボタンを非表示
	$('#btn_pause').hide();
	
	// タイマー開始／停止
	timer.init({hms:$('#display #timer_hms'), ms:$('#display #timer_ms')});
	var timerHandler = function( evt ){
		var id = evt.target.id;
		switch( id ){
			case 'btn_start':
				$('#btn_start').hide();
				$('#btn_pause').show();
				
				timer.start();
				break;
			case 'btn_stop':
				$('#btn_pause').hide();
				$('#btn_start').show();
				
				timer.stop();
				break;
			case 'btn_pause':
				$('#btn_pause').hide();
				$('#btn_start').show();
				
				timer.pause();
				break;
		};
	};
	$('.btn').on('click', timerHandler);
});
$(window).load(function(){
});
