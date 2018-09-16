window.onload = initAll;

//Array to store used nums 
var usedNums = new Array(76);

function initAll() {
	if (document.getElementById) {
		document.getElementById("reload").onclick = anotherCard;
		newCard();
	}
	else { //If user's browser does not support script, show alert
		alert("Sorry, your browser doesn't support this script");
	}
}

//Generate new play card
function newCard() {
	for (var i=0; i<24; i++) {
		setCell(i);
	}
}

function setCell(thisCell) {
	var currCell = "cell" + thisCell;
	var colPlace = new Array(0,0,0,0,0,1,1,1,1,1,2,2,2,2,3,3,3,3,3,4,4,4,4,4);
	var colBasis = colPlace[thisCell] * 15;
	var newNum;

    //Make sure no duplicate numbers in the cells
	do {
		newNum = colBasis + getNewNum() + 1;
	}
	while (usedNums[newNum]);
    //If there is number used, set to true
	usedNums[newNum] = true;
	document.getElementById(currCell).innerHTML = newNum;
	document.getElementById(currCell).className = "";
	document.getElementById(currCell).onmousedown = toggleColor;
}

function getNewNum() {
	return Math.floor(Math.random() * 15);
}

//Change usedNums array to false, then generate new numbers for new card
function anotherCard() {
	for (var i=1; i<usedNums.length; i++) {
		usedNums[i] = false;
	}

	newCard();
	return false;
}


//Microsoft browser or non-IE browser
function toggleColor(evt) {
	if (evt) { //Non-IE browser
		var thisCell = evt.target;
	}
	else { //IE browser
		var thisCell = window.event.srcElement;
	}
	if (thisCell.className == "") {
		thisCell.className = "pickedBG";
	}
	else {
		thisCell.className = "";
	}
    //Check does player win the game
	checkWin();
}

function checkWin() {
	var winningOption = -1;
	var setCells = 0;
	var winners = new Array(31,992,15360,507904,541729,557328,1083458,2162820,4329736,8519745,8659472,16252928);

	for (var i=0; i<24; i++) {
		var currCell = "cell" + i;
		if (document.getElementById(currCell).className != "") {
			document.getElementById(currCell).className = "pickedBG";
			setCells = setCells | Math.pow(2,i);
		}
	}

	for (var i=0; i<winners.length; i++) {
		if ((winners[i] & setCells) == winners[i]) {
			winningOption = i;
		}
	}
	
	if (winningOption > -1) {
		for (var i=0; i<24; i++) {
			if (winners[winningOption] & Math.pow(2,i)) {
				currCell = "cell" + i;
				document.getElementById(currCell).className = "winningBG";
			}
		}
	}
}