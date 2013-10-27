var timer = {
	_start		: 0,
	_pause		: false,
	_pauseTime	: 0,
	_pointer	: -1,
	_sync		: 100,
	_target		: null,
	init	: function( obj ){
		timer._target = obj;
		timer.reset();
	},
	reset	: function(){
		timer._start = 0;
		timer._pause = false;
		timer._pauseTime = 0;
		if( timer._pointer >= 0 ){
			clearInterval( timer._pointer );
			timer._pointer = -1;
		}
		timer.output();
	},
	start	: function(){
		if( !timer._target.hms.size() ){
			throw 'Error: missing target.';
			return;
		}
		if( !timer._pause ){
			// pause中じゃなかったら初期化
			timer._start = new Date().getTime();
			timer._pointer = setInterval(timer.exec, timer._sync);
			timer.exec();
		}else{
			timer._pause = false;
			timer._start += (new Date().getTime() - timer._pauseTime);
			timer._pauseTime = 0;
		}
	},
	pause	: function(){
		if( timer._start > 0 ){
			timer._pause = true;
			timer._pauseTime += new Date().getTime();
		}
	},
	stop	: function(){
		timer.reset();
	},
	exec	: function(){
		if( timer._pause ){
//			timer._start += timer._sync;
			return;
		}
		timer.output();
	},
	output	: function(){
		var timeleft = new Date().getTime() - timer._start;
		var dt = new Date();
		if( timer._start > 0 ){
			dt.setTime( timeleft );
		}else{
			dt.setTime( 0 );
		}
		dt.addHours(-9);
		var milliseconds = dt.getTime().toString().slice(-3).substring(0, 2);
		timer._target.hms && timer._target.hms.html( dt.toFormat('HH24:MI:SS') );
		timer._target.ms && timer._target.ms.html( milliseconds );
	},
	getStatus	: function(){
		if( timer._start <= 0 ){
			return 'stop';
		}else if( timer._pause ){
			return 'pause';
		}else{
			return 'start';
		}
	}
};
