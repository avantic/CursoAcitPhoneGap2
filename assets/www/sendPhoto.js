$(document).bind("mobileinit", function(){
		$('#pageSendPhoto').live('pagebeforeshow',function(event){
			captureSendPhoto();
		});
});

function captureSendPhoto() {
	navigator.device.capture.captureImage(onPhotoDataSuccess, onPhotoFail, {limit:1});
		
	function onPhotoDataSuccess(imageData) {
		var imageURI = imageData[0].fullPath;
		var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imageURI, "http://192.168.1.15:8000", uploadSuccess, uploadFail, options);
	}
	
	function uploadSuccess(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        alert(r.response);
    }

    function uploadFail(error) {
        alert("An error has occurred: Code = " = error.code);
    }
	
	function onPhotoFail(message) {
		if (message != "Canceled.") {
			alert('Error al capturar la foto: ' + message);
		}
	}
	
}