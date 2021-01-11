var maxPahulja = 99;
var bojaPahulja = ["#DDD", "#EEE"];
var entitet = "&#x2022;";
var snijegBrzina = 0.75;
var snijegMinSize = 8;
var snijegMaxSize = 24;
var refresh = 50;
var snijegStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";

var snijeg = [],
	pos = [],
	coords = [],
	lefr = [],
	marginBottom,
	marginRight;

function randomise(range) {
	let rand = Math.floor(range * Math.random());
	return rand;
}

function napraviSnijeg() {
	var snijegSize = snijegMaxSize - snijegMinSize;
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;

	for (let i = 0; i <= maxPahulja; i++) {
		coords[i] = 0;
		lefr[i] = Math.random() * 15;
		pos[i] = 0.03 + Math.random() / 10;
		snijeg[i] = document.getElementById("flake" + i);
		snijeg[i].style.fontFamily = "inherit";
		snijeg[i].size = randomise(snijegSize) + snijegMinSize;
		snijeg[i].style.fontSize = snijeg[i].size + "px";
		snijeg[i].style.color = bojaPahulja[randomise(bojaPahulja.length)];
		snijeg[i].style.zIndex = 1000;
		snijeg[i].sink = snijegBrzina * snijeg[i].size / 5;
		snijeg[i].posX = randomise(marginRight - snijeg[i].size);
		snijeg[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snijeg[i].size);
		snijeg[i].style.left = snijeg[i].posX + "px";
		snijeg[i].style.top = snijeg[i].posY + "px";
	}

	movesnijeg();
}

function resize() {
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;
}

function movesnijeg() {
	for (let i = 0; i <= maxPahulja; i++) {
		coords[i] += pos[i];
		snijeg[i].posY += snijeg[i].sink;
		snijeg[i].style.left = snijeg[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
		snijeg[i].style.top = snijeg[i].posY + "px";

		if (snijeg[i].posY >= marginBottom - 2 * snijeg[i].size || parseInt(snijeg[i].style.left) > (marginRight - 3 * lefr[i])) {
			snijeg[i].posX = randomise(marginRight - snijeg[i].size);
			snijeg[i].posY = 0;
		}
	}

	setTimeout("movesnijeg()", refresh);
}

for (let i = 0; i <= maxPahulja; i++) {
	document.write("<span id='flake" + i + "' style='" + snijegStyles + "position:absolute;top:-" + snijegMaxSize + "'>" + entitet + "</span>");
}

window.addEventListener('resize', resize);
window.addEventListener('load', napraviSnijeg);
