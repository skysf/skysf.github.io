//When window finishes loading, trigger the initAll() function
window.onload = initAll;

//Array to store used nums 
var usedNums = new Array(76);

//AD: -
var theAdCounter = 0;
//AD: -the array stores the links when user click AD banner
var adClickURL = new Array("linkedin.com/in/tianyu-lu-a3850138/","apple.com","youtube.com/watch?v=1jWCXJfxHQM");
//AD: -the array contains the names of the three GIF files
var adImages = new Array("Images/banner1.png","Images/banner2.png","Images/banner3.png");


function initAll() {
	if (document.getElementById) {
		document.getElementById("reload").onclick = anotherCard;
		newCard();
	}
	else { //If user's browser does not support script, show alert
		alert("Sorry, your browser doesn't support this script");
	}
    
    //AD: - first checks to see if the adBannerImages object is surrounded by a link tag. if so, when the link is clicked, the newLocation() function will be called. Finally, the rotate() functions is called
    if (document.getElementById("adBannerImages").parentNode.tagName == "A") {
		document.getElementById("adBannerImages").parentNode.onclick = newLocation;
	}
	
	rotate();
    
}


/***************AD FUNC************************/
function newLocation() {
    //set current doc window to the text string "htpp://www." plus the value of one item from adClickURL.
    
    
    document.location.href = "http://www." + adClickURL[theAdCounter];
    
    
	

	return false;//tell browser does not load href in html file. load above link only
}

function rotate() {
    //increase by one
	theAdCounter++;
    //when theAdCounter reaches same value as number of items in the array, set it back to 0
	if (theAdCounter == adImages.length) {
		theAdCounter = 0;
	}
	document.getElementById("adBannerImages").src = adImages[theAdCounter];
    
    //Every 3 seconds, change image
	setTimeout(rotate, 3 * 1000);
}

/***************GAME FUNC************************/
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