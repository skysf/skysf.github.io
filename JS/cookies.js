window.addEventListener("load",initPage,false);

function initPage() {
	var expireDate = new Date();
	expireDate.setMonth(expireDate.getMonth()+6);

    //Display name
    if (document.cookie != "") {
		document.getElementById("nameField").innerHTML = "Hello, " + document.cookie.split("=")[1];
	}
    
	var hitCt = parseInt(cookieVal("pageHit"));
	hitCt++;

	document.cookie = "pageHit=" + hitCt + ";expires=" + expireDate.toGMTString();
	document.getElementById("pageHits").innerHTML = "You have visited this page " + hitCt + " times.";
    
    var userName = "";
	if (document.cookie != "") {
		userName = document.cookie.split("=")[1];
	}

	document.getElementById("nameField").value = userName;
	document.getElementById("nameField").onblur = setCookie;
	document.getElementById("cookieForm").onsubmit = setCookie;
    
    
}

function cookieVal(cookieName) {
	var thisCookie = document.cookie.split("; ");
	
	for (var i=0; i<thisCookie.length; i++) {
		if (cookieName == thisCookie[i].split("=")[0]) {
			return thisCookie[i].split("=")[1];
		}
	}
	return 0;
}

function setCookie() {
	var expireDate = new Date();
	expireDate.setMonth(expireDate.getMonth()+6);
	
	var userName = document.getElementById("nameField").value;
	document.cookie = "userName=" + userName + ";expires=" + expireDate.toGMTString();
	
	document.getElementById("nameField").blur();
	return false;
}