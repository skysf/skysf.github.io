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
    document.getElementById("helloMessage").innerHTML = "Mobile App Developer";
}

function showSomething() {
	switch(this.id) {
		case "Linkedin":
			alert("https://www.linkedin.com/in/lu-sky-a3850138/");
			break;
		case "AppStore":
			alert("Ask not what your country can do for you...");
			break;
		case "Apartment":
			alert("I had my own apartment before!");
			break;
		default:
	}
}