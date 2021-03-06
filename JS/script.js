/*
Name: TIANYU(SKY) LU
Student ID: @00300456
Assignment: No.2
*/
window.onload = initAll; //Add buttons

function initAll() {
	document.getElementById("Linkedin").onclick = showSomething;
	document.getElementById("AppStore").onclick = showSomething;
	document.getElementById("Apartment").onclick = showSomething;
    
    //Display message
    document.getElementById("helloMessage").innerHTML = "HELLO WORLD";
}


function showSomething() {
	switch(this.id) {
		case "Linkedin":
            window.location = "https://www.linkedin.com/in/tianyu-lu-a3850138/"
			break;
		case "AppStore":
            //Pop up a window with "OK" and "Cancel"
            var appAnswer = confirm("Click OK to AppStore page")
			
            //If user click ok, it will jump to below AppStore link
            if (appAnswer) {
                window.location = "https://itunes.apple.com/us/app/tip-calculator-split-u-bills/id1385884544?mt=8"
            }
			break;
		case "Apartment":
			//Pop up a window with "OK" and "Cancel"
            var apartmentAnswer = confirm("Click OK to YouTube to watch guest review for my apartment")
			
            //If user click ok, it will jump to youtube
            if (apartmentAnswer) {
                window.location = "https://www.youtube.com/watch?v=nlFHZg6GezA"
            }
			break;
		default:
	}
}