
function LoadingManager() {

	var loadingWrapper = $("#loadingWrapper");
	var loadingContainer = $("#loadingContainer");
	var loadingMediaDiv = $("#loadingMediaDiv");

	var animationTime = 500;

	var spinny = new Spinny("spinny");

	var fadeInSemahpore = false;
	var fadeOutSemaphore = false;

	var afterFadeIn = null;
	var afterFadeOut = null;

	var present = false

	this.LoadPage = function(dependency) {
		if(fadeInSemahpore) {
			return;
		} else if(fadeOutSemaphore) {
			afterFadeOut = function() {
				LoadPage(dependency);
			}
			return;
		}

		fadeInSemahpore = true;
		present = true;

		spinny.Spin();
		$("body").prepend(loadingContainer);
		loadingWrapper.animate({
			width: "+=100",
			height: "+=100",
			opacity: "1",
			marginTop: 0,
			marginLeft: 0
		}, animationTime, function() {
			document.location.href="#loadingContainer";
			dependency();
			fadeInSemahpore = false;
			if(afterFadeIn != null) {
				afterFadeIn();
				afterFadeIn = null;
			}
		});

		loadingMediaDiv.animate({
			opacity: "1"
		}, animationTime);
	}

	this.PageLoaded = function() {
		if(fadeOutSemaphore) {
			return;
		} else if(fadeInSemahpore) {
			afterFadeIn = function() {
				PageLoaded();
			}
			return;
		} else if(!present) {
			return;
		}

		fadeOutSemaphore = true;

		loadingWrapper.animate({
			width: "-=100",
			height: "-=100",
			opacity: "0",
			marginTop: 50,
			marginLeft: 50
		}, animationTime, function() {
			loadingContainer.remove();
			spinny.Stop();
			fadeOutSemaphore = false;
			if(afterFadeOut != null) {
				afterFadeOut();
				afterFadeOut = null;
			}
			present = false;
		});

		loadingMediaDiv.animate({
			opacity: "0"
		}, animationTime);
	}

}

var loadingManager = new LoadingManager();

function LoadPage(dependency) {
	console.log("Loading: " + dependency);
	loadingManager.LoadPage(dependency);
}

function PageLoaded() {
	loadingManager.PageLoaded();
}