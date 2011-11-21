
$(document).bind("mobileinit", function(){
	$.mobile.loadingMessage = "Cargando...";
	$.mobile.page.prototype.options.backBtnText = "Volver";
	$.mobile.defaultPageTransition = "none";
});

function onLoad() {
	document.addEventListener("deviceready", deviceInfo, false);
}

var deviceInfo = function() {
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("name").innerHTML = device.name;
    document.getElementById("width").innerHTML = screen.width;
    document.getElementById("height").innerHTML = screen.height;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth;
};