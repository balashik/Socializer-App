
function Spinny(elementId) {

	var canvas = document.getElementById(elementId);
	var ctx = canvas.getContext("2d");

	var halter = false;
	var speed = 0.07;
	var sAngle = 0;
	var eAngle = 0;
	var stage = 0;
	var waited = 0;

	ctx.strokeStyle = '#ff7058';
	ctx.lineWidth=5;

	var centerX = 100 + ctx.lineWidth;
	var centerY = 100 + ctx.lineWidth;

	function Draw() {
		ctx.clearRect(0, 0, 210, 210);
		ctx.beginPath();
		ctx.arc(centerX, centerY, 100, sAngle, eAngle);
		ctx.stroke();

		if(stage == 0) {
			eAngle += speed;
			if(eAngle >= (2*Math.PI)) {
				stage = 1;
			}
		} else if(stage == 1) {
			sAngle += speed;
			if(sAngle >= (2*Math.PI)) {
				sAngle = 0;
				eAngle = 0;
				stage = 2;
			}
		} else {
			waited += speed;
			if(waited > 1) {
				stage = 0;
				waited = 0;
			}
		}
		if(halter) {
			halter = false;
		} else {
			window.requestAnimationFrame(Draw);
		}
	}

	this.Spin = function() {
		Draw();
	}

	this.Stop = function() {
		halter = true;
	}

	this.Spin();

}