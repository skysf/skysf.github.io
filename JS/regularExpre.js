window.onload = initForm;

function initForm() {
	document.forms[0].onsubmit = validForm;
	document.getElementById("sunroof").onclick = doorSet;
}

function validForm() {
	var allGood = true;
	var allTags = document.forms[0].getElementsByTagName("*");

	for (var i=0; i<allTags.length; i++) {
		if (!validTag(allTags[i])) {
			allGood = false;
		}
	}
	return allGood;

	function validTag(thisTag) {
		var outClass = "";
		var allClasses = thisTag.className.split(" ");
	
		for (var j=0; j<allClasses.length; j++) {
			outClass += validBasedOnClass(allClasses[j]) + " ";
		}
	
		thisTag.className = outClass;
	
		if (outClass.indexOf("invalid") > -1) {
			invalidLabel(thisTag.parentNode);
			thisTag.focus();
			if (thisTag.nodeName == "INPUT") {
				thisTag.select();
			}
			return false;
		}
		return true;
		
		function validBasedOnClass(thisClass) {
			var classBack = "";
		
			switch(thisClass) {
				case "":
				case "invalid":
					break;
				case "reqd":
					if (allGood && thisTag.value == "") {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;
				case "radio":
					if (allGood && !radioPicked(thisTag.name)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;
				case "isNum":
					if (allGood && !isNum(thisTag.value)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;
				case "isZip":
					if (allGood && !isZip(thisTag.value)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;
				case "email":
					if (allGood && !validEmail(thisTag.value)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;
                case "phone":
					if (allGood && !validPhone(thisTag.value)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;
                case "imgURL":
					if (allGood && !setImgURL(thisTag.value)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;    
				default:
					if (allGood && !crossCheck(thisTag,thisClass)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
			}
			return classBack;
				
			function crossCheck(inTag,otherFieldID) {
				if (!document.getElementById(otherFieldID)) {
					return false;
				}
				return (inTag.value != "" || document.getElementById(otherFieldID).value != "");
			}
			
			function radioPicked(radioName) {
				var radioSet = document.forms[0][radioName];
	
				if (radioSet) {
					for (k=0; k<radioSet.length; k++) {
						if (radioSet[k].checked) {
							return true;
						}
					}
				}
				return false;
			}
			
            
            function setImgURL(newURL) {
			var re = /^(file|http):\/\/\S+\/\S+\.(gif|jpg|png)$/i;

			if (re.test(newURL)) {
				document.getElementById("chgImg").src = newURL;
				return true;
			}
			return false;
		    }
            
			function isNum(passedVal) {
				if (passedVal == "") {
					return false;
				}
				for (var k=0; k<passedVal.length; k++) {
					if (passedVal.charAt(k) < "0") {
						return false;
					}
					if (passedVal.charAt(k) > "9") {
						return false;
					}
				}
				return true;
			}
			
			function isZip(inZip) {
				if (inZip == "") {
					return true;
				}
				return (isNum(inZip));
			}
			
			function validEmail(email) {
				var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

			    return re.test(email);
			}
            
            function validPhone(phoneNum) {
			var re = /^\(?(\d{3})\)?[\.\-\/ ]?(\d{3})[\.\-\/ ]?(\d{4})$/;

			var phoneArray = re.exec(phoneNum);
			if (phoneArray) {
				document.getElementById("phoneField").value = "(" + phoneArray[1] + ") " + phoneArray[2] + "-" + phoneArray[3];
				return true;
			}
			return false;
		    }
		}
	}
		
	function invalidLabel(parentTag) {
		if (parentTag.nodeName == "LABEL") {
			parentTag.className += " invalid";
		}
	}
}

function doorSet() {
	if (this.checked) {
		document.getElementById("twoDoor").checked = true;
	}
}

