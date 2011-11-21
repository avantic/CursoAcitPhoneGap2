
$(document).bind("mobileinit", function(){
		$('#pagePhoto').live('pagebeforeshow',function(event){
			capturePhoto();
		});
});

function capturePhoto() {
	navigator.device.capture.captureImage(onPhotoDataSuccess, onFail, {limit:2});
		
	function onPhotoDataSuccess(mediaFiles) {
		document.getElementById('photo').src = mediaFiles[0].fullPath;
		document.getElementById('photo2').src = mediaFiles[1].fullPath;
	}
	
	function onFail(message) {
		if (message != "Canceled.") {
			alert('Error al capturar la foto: ' + message);
		}
	}
}