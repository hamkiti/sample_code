var soundAdaptor = (function(){
	var _context = null;
	var _buffers = {};
	
	function _initialize() {
		_context = new (window.AudioContext || window.webkitAudioContext)();
	}
	
	function _silentBeep(){
		var context = _context;
		var buf = context.createBuffer(1, 1, 22050);
		var src = context.createBufferSource();
		src.buffer = buf;
		src.connect(context.destination);
		src.start(0);
	}

	function _playBeep(buffer) {
		var context = _context;
		var source = context.createBufferSource();
		source.buffer = buffer;
		source.connect(context.destination);
		source.start(0);
	}

	function _loadFile(soundKeyCode, src, callback){
		var self = this;
		var context = this.context;
		var xml = new XMLHttpRequest();
		xml.open('GET', src);
		xml.onreadystatechange = function() {
			if (xml.readyState === 4){
				if ([200, 201, 0].indexOf(xml.status) !== -1) {
					var data = xml.response;
					// webaudio 用に変換
					_context.decodeAudioData(data, function(buffer) {
						// buffer登録
						_buffers[soundKeyCode] = buffer;
						// コールバック
						if(callback != null && typeof(callback.success) == 'function'){
							callback.success(buffer, soundKeyCode, src);
						}
					});

				} else {
					
					// コールバック
					if(callback != null && typeof(callback.error) == 'function'){
						callback.error(xml, soundKeyCode, src);
					}
				}
			}
		};
		xml.responseType = 'arraybuffer';
		xml.send(null);
	}


	_initialize();
	
	return {
		silentBeep:function(){
			_silentBeep();//ios hack
		},

		play:function(soundKeyCode){
			if(_buffers[soundKeyCode] != null){
				_playBeep(_buffers[soundKeyCode]);
			} else {
				console.error('soundAdaptor', 'soundNotFound');
			}
		},
		loadFile:function(soundKeyCode, src, callback){
			_loadFile(soundKeyCode, src, callback);
		}
	};
})();
