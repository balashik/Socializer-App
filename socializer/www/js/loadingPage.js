
function LoadingManager() {

	var loadingWrapper = $("#loadingBackground");
	var loadingContainer = $("#loadingContainer");
	var loadingMediaDiv = $("#loadingMediaDiv");
	var wrapper = $("#wrapper");

	var animationTime = 500;

	var spinny = new Spinny("spinny");

	var fadeInSemahpore = false;
	var fadeOutSemaphore = false;

	var present = true;

	var height = loadingWrapper.height();
	var width = loadingWrapper.width();
	console.log("height: " + height + ", width: " + width);

	var sizeOffset = -100;

	this.LoadPage = function(dependency) {
		console.log("LoadPage");
		if(fadeInSemahpore) {
			return;
		} else if(fadeOutSemaphore) {
			loadingWrapper.stop(true);
			loadingMediaDiv.stop(true);
			fadeOutSemaphore = false;
		}

		fadeInSemahpore = true;
		present = true;

		spinny.Spin();
		wrapper.prepend(loadingContainer);
		var calculatedTime = animationTime * ((width - parseFloat(loadingWrapper.css("width"))) / Math.abs(sizeOffset));
		console.log(calculatedTime);
		loadingWrapper.animate({
			width: "" + width + "px",
			height: "" + height + "px",
			opacity: "1",
			marginTop: 0,
			marginLeft: 0
		}, calculatedTime, function() {
			document.location.href="#loadingContainer";
			dependency();
			console.log("Dependency called");
			fadeInSemahpore = false;
		});

		loadingMediaDiv.animate({
			opacity: "1"
		}, calculatedTime);
	}

	this.PageLoaded = function() {
		console.log("PageLoaded");
		if(fadeOutSemaphore) {
			return;
		} else if(fadeInSemahpore) {
			loadingWrapper.stop(true);
			loadingMediaDiv.stop(true);
			fadeInSemahpore = false;
		} else if(!present) {
			return;
		}

		fadeOutSemaphore = true;
		var calculatedTime = animationTime * ((parseFloat(loadingWrapper.css("width")) - (width + sizeOffset)) / Math.abs(sizeOffset));
		console.log(calculatedTime);
		loadingWrapper.animate({
			width: "" + (width + sizeOffset) + "px",
			height: "" + (height + sizeOffset) + "px",
			opacity: "0",
			marginTop: (sizeOffset * -0.5),
			marginLeft: (sizeOffset * -0.5)
		}, calculatedTime, function() {
			loadingContainer.remove();
			spinny.Stop();
			fadeOutSemaphore = false;
			present = false;
		});

		loadingMediaDiv.animate({
			opacity: "0"
		}, calculatedTime);
	}

	this.AlignPage = function(ratio) {
		loadingMediaDiv.css({left: '50%', top: '50%', transform: 'translate(-50%, -50%)'});
		width = $('body').width();
		height = width * (window.screen.height / window.screen.width);
		console.log("height: " + height + ", width: " + width);
	}

}

var loadingManager = new LoadingManager();

function LoadPage(dependency) {
	loadingManager.LoadPage(dependency);
}

function PageLoaded() {
	loadingManager.PageLoaded();
}