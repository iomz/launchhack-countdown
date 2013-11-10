var localVideo;
var localCanvas;
//var worker = new Worker('ccv.js');

initialize = function() {
localVideo = document.getElementById("localVideo");
localCanvas = document.getElementById("localCanvas");
getUserMedia();
}

getUserMedia = function() {
  try { navigator.webkitGetUserMedia({video:true,audio:true}, onGotStream, onFailedStream);
    //trace("Requested access to local media");
  } catch (e) {
  alert("getUserMedia error " + e);
    //trace_e(e, "getUserMedia error");
  }
}

poll = function() {  
  var w = localVideo.videoWidth;
  var h = localVideo.videoHeight;
  var canvas = document.createElement('canvas');
  canvas.width  = w;
  canvas.height = h;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(localVideo, 0, 0, w, h);  
  var comp = ccv.detect_objects({ "canvas" : ccv.grayscale(canvas),
										"cascade" : cascade,
										"interval" : 5,
										"min_neighbors" : 1 });    
  localCanvas.width = localVideo.clientWidth;
  localCanvas.height = localVideo.clientHeight;
}

onGotStream = function(stream) {
  var url = webkitURL.createObjectURL(stream);
  localVideo.style.opacity = 1; localVideo.src = url;
  localStream = stream;
  
  //trace("User has granted access to local media. url = " + url);
}

onFailedStream = function(error) {
  alert("Failed to get access to local media. Error code was " + error.code + ".");
  //trace_warning("Failed to get access to local media. Error code was " + error.code);
} 

setTimeout(initialize, 1);

