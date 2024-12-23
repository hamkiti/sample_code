var soundPath = './sound/';
var audio = {};
$(function(){


	//デバッグ表示 ***********************************************************
	var objDebug = $('#DEBUG');
	objDebug.on('msg', function(ev, msg){
		var msg = (msg != null) ? msg:'';
		var arrMsg = String(msg).split("\n");
		$(this).append($('<div>'+arrMsg.join("<br />\n")+'</div>'));
	});
	var _privateLog = console.log;
	console.log = function(){
		var msg = [];
		if(arguments[0] != null){msg.push(arguments[0]);}
		if(arguments[1] != null){msg.push(arguments[1]);}
		if(arguments[2] != null){msg.push(arguments[2]);}
		objDebug.trigger('msg', msg.join(","));
		_privateLog.apply(console, arguments);
	};
	//***********************************************************

	var objData = $('#data_00');
	var objOptionTmpl = $('<option value=""></option>');
	
	getSoundList({
		success:function(res){
			var data;
			if(res != null && res._error != null){
				console.log('サーバエラー');
			} else {
				data = res;
			}
			var objSelect = objData.find('select[name="sound_1"]').eq(0);
			var obj,val;
			objSelect.empty();
			if(data.list != null){
				for(var key in data.list){
					val = data.list[key];
					obj = objOptionTmpl.clone();
					obj.val(val['file']);
					obj.text(val['item_name']+' ('+val['file']+')');
					obj.attr('data-filepath', soundPath+val['file']);
					// audio[val['file']] = new Audio(soundPath+val['file']);
					
					soundAdaptor.loadFile(val['file']
						,obj.attr('data-filepath')
						,{
							success:function(buffer, soundKeyCode, src){
								console.log('success:'+src);
							},
							error:function(xmlObj, soundKeyCode, src){
								console.log('error:'+src);
							},
						}
					);



					objSelect.append(obj);
				}
			}

		},
		error:function(){
			console.log('通信エラー');
		}
	});

	


	$(document)
		.one('click', function(ev){
			soundAdaptor.silentBeep();//モバイル端末用 ハック 無音
			console.log('touchstart soudload');
			var soundFile = objData.find('select[name="sound_1"]').val();
			soundAdaptor.play(soundFile);
		});

	objData.find('.sound_thread').each(function(){
		var objSoundThread = $(this);

		objSoundThread.find('[data-act="play"]').on('click', function(){
			var soundFile = objSoundThread.find('select[name="sound_1"]').val();
			soundAdaptor.play(soundFile);
		});
	
	});

	$('.tapbox').on('click', function(){
		var soundFile = objData.find('select[name="sound_1"]').val();
		soundAdaptor.play(soundFile);
	});


});

function getSoundList(callback){
	var sendParam = {};
	$.ajax({
		type: 'POST',
		url: './dataapi/getSoundList.php',
		dataType: 'json',
		async:true,
		timeout:5000,
		data :sendParam,
		success: function(res){
			if(callback != null && typeof(callback.success) == 'function'){
				callback.success(res);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert(XMLHttpRequest.status);
			if(callback != null && typeof(callback.error) == 'function'){
				callback.error();
			}
		}
	});
}