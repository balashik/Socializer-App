
var loadingWrapper = $("#loadingWrapper");
var loadingContainer = $("#loadingContainer");
var loadingMediaDiv = $("#loadingMediaDiv");

var canvas = document.getElementById("spinny");
var b_context = b_canvas.getContext("2d");

function draw_b() {
  var b_canvas = document.getElementById("b");
  var b_context = b_canvas.getContext("2d");
  b_context.fillRect(50, 25, 150, 100);
}

var animationTime = 500;

function LoadPage(dependency) {

	document.location.href="#loadingContainer";

	$("body").prepend(loadingContainer);
	loadingWrapper.animate({
		width: "+=100",
		height: "+=100",
		opacity: "1",
		marginTop: 0,
		marginLeft: 0
	}, animationTime, function() {
		dependency();
	});

	loadingMediaDiv.animate({
		opacity: "1"
	}, animationTime);

}

function PageLoaded() {

	loadingWrapper.animate({
		width: "-=100",
		height: "-=100",
		opacity: "0",
		marginTop: 50,
		marginLeft: 50
	}, animationTime, function() {
		loadingContainer.remove();
	});

	loadingMediaDiv.animate({
		opacity: "0"
	}, animationTime);

}