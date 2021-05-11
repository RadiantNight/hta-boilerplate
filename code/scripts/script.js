// FSO Global Variables
var objFSO = new ActiveXObject("Scripting.FileSystemObject");
var ForReading = 1;
var ForWriting = 2;
var ForAppending = 8;
var submissionsFolder = objFSO.GetAbsolutePathName(".") + "\\code\\submissions\\";

// Example of a unique ID (UNIX timestamp)
//var submissionId = new Date().valueOf();

// Example of opening a file with FSO
//var objFile = objFSO.OpenTextFile(submissionsFolder + submissionId + ".txt", ForWriting, true);

// And: peanut butter&&jelly
// Or: Paper || plastic
// Not: I can't believe it's !butter&&jellyAssignment: var myNameIs="John"


// Populate select items
	// if O or E selected
	// Populate select items 1-9
	// if W selected
	// populate select items 1-5
	
var i = 1;


function makeRankNumbers(rankType) {
	var selectGrade = document.querySelector("#rank-number-select")
	deleteChildren(selectGrade)
    
	if (rankType == 1) {
		// alert ("Officer or Enlisted")
		for (var rankNumber = 1; rankNumber <11; rankNumber++ ) {
			createRankNumberElements(rankNumber)
			
			// var containerElement = document.querySelector("#container");
			// containerElement.appendChild(square);
		}
	}
	else if (rankType == 2){
		for (var rankNumber = 1; rankNumber < 6; rankNumber++) {
			createRankNumberElements(rankNumber)
		}
	}
	else if (rankType == 3) {
		for (var rankNumber = 1; rankNumber < 10; rankNumber++) {
			createRankNumberElements(rankNumber)
		}
	}
	else {
		deleteChildren(selectGrade)
	}
}

function createRankNumberElements (rankNumber) {
	var rankNumberElement = document.createElement('option');
	rankNumberElement.setAttribute("value", rankNumber)
	rankNumberElement.innerText = rankNumber;
			
	var containerElement = document.querySelector("#rank-number-select");
	containerElement.appendChild(rankNumberElement)
}

function deleteChildren(selectGrade) {
	while (selectGrade.lastChild.value != "") {
        selectGrade.removeChild(selectGrade.lastChild);
	}
}

function submitForm() {
	
	var validationMessage = validateForm();
	if (validationMessage == "OK") {
		saveToFolder()
		clearForm()
		alert("Thank you for your submission")
	}
	else {
		alert("Please fill out all fields")
	}
	
}	

function saveToFolder() {
	
	var firstName = document.querySelector("#f-name")
	var lastName = document.querySelector("#l-name")
	var phoneNumber = document.querySelector("#phone-number")
	var rank = document.querySelector('[name="rank-type"]:checked')
	var grade = document.querySelector('#rank-number-select')
	var emailAddress = document.querySelector("#email")
	var agreeCheckBox = document.querySelector("#agree")

	//store it in an array
	var data = 
		'firstName: ' + firstName.value + '\r\n' +
		'lastName: ' + lastName.value + '\r\n' +
		'phoneNumber: ' + phoneNumber.value + '\r\n' +
		'rank: ' + rank.value + grade.value + '\r\n' +
		'email: ' + emailAddress.value;
	
	
	var submissionId = new Date().valueOf();
	var objFile = objFSO.OpenTextFile(submissionsFolder + submissionId + ".txt", ForWriting, true);
	objFile.Write(data);
	objFile.Close();
}



function validateForm() {
	var formInformation = document.querySelectorAll("*:invalid")
	if (formInformation.length == 0) {
		return "OK"
	}
	else {
		return "noGo"
	}
}


function clearForm() {
	
	var checkboxValue = document.querySelector("#agree")
	checkboxValue.checked = false
	var radioButtonValue = document.querySelector("[name='rank-type']:checked")
	radioButtonValue.checked = false
	var formInputFields = document.querySelectorAll("input, select")
	for (i = 0; i < formInputFields.length; i++) {
		formInputFields[i].value = ""
	}
}


// var something = document.querySelectorAll("input, select")
// for (i = 0, i < something.length, i++) {
	
// }