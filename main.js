var fName;
var fShort;
var fSummary;
var fDescription;
var fPrize;
var fInterval;

function getForm() {
	var x = document.getElementById("chalForm");
	fName = x.elements[0].value;
	fShort = x.elements[1].value;
	fSummary = x.elements[2].value;
	fDescription = x.elements[3].value;
	fDescription = fDescription.replace(/(?:\r\n|\r|\n)/g, "%0D%0A");
	fPrize = x.elements[4].value;
	fInterval = x.elements[5].value;
	fGroup = x.elements[6].value;
	document.getElementById("demo").innerHTML = fName + "<br>" + fShort + "<br>" + fSummary + "<br>" + fDescription + "<br>" + fPrize + "<br>" + fInterval + "<br>" + fGroup;
}

function createChallenge(name, shortName, summary, description) {
	var chalID;
	var xhttp = new XMLHttpRequest();
	var resText;
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200 || 201) {
			var resText = this.responseText;
			var res2 = JSON.parse(resText);
			chalID = res2.data.id;
			document.getElementById("demo").innerHTML = "Challenge URL: https://habitica.com/challenges/" + chalID;
		}
	};
	xhttp.open("POST", "https://habitica.com/api/v3/challenges/", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.setRequestHeader("x-api-user", "fb308060-0861-42ac-8f79-72d2e52eb359");
	xhttp.setRequestHeader("x-api-key", "2c52e670-5a8c-49a8-89c0-de64e46c990c");
	xhttp.send("group=" + fGroup + "&name=" + fName + "&shortName=" + fShort + "&summary=" + fSummary + "&description=" + fDescription);
}

function awardWinner(challengeID, winnersID) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("demo").innerHTML = this.responseText;
		}
	};
	xhttp.open("POST", "https://habitica.com/api/v3/challenges/" + challengeID + "/selectWinner/" + winnersID, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.setRequestHeader("x-api-user", "fb308060-0861-42ac-8f79-72d2e52eb359");
	xhttp.setRequestHeader("x-api-key", "2c52e670-5a8c-49a8-89c0-de64e46c990c");
	xhttp.send("");
}

function fullSequence() {
	var winnerID;
	var chalID;
	var numMembers;
	//create challenge
	var xhttp = new XMLHttpRequest();
	var resText;
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200 || 201) {
			var resText = this.responseText;
			var res2 = JSON.parse(resText);
			chalID = res2.data.id;
			document.getElementById("demo").innerHTML = "Challenge URL: https://habitica.com/challenges/" + chalID;
		}
	};
	xhttp.open("POST", "https://habitica.com/api/v3/challenges/", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.setRequestHeader("x-api-user", "fb308060-0861-42ac-8f79-72d2e52eb359");
	xhttp.setRequestHeader("x-api-key", "2c52e670-5a8c-49a8-89c0-de64e46c990c");
	console.log(fName);
	xhttp.send("group=" + fGroup + "&name=" + fName + "&shortName=" + fShort + "&summary=" + fSummary + "&description=" + fDescription);
	setTimeout(function() {
		//get challenge, choose winner
		var xhttp2 = new XMLHttpRequest();
		xhttp2.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var resText2 = this.responseText;
				var res3 = JSON.parse(resText2);
				numMembers = res3.data.memberCount;
			}
		};
		xhttp2.open("GET", "https://habitica.com/api/v3/challenges/" + chalID, true);
		xhttp2.setRequestHeader("x-api-user", "fb308060-0861-42ac-8f79-72d2e52eb359");
		xhttp2.setRequestHeader("x-api-key", "2c52e670-5a8c-49a8-89c0-de64e46c990c");
		xhttp2.send();
		var xhttp = new XMLHttpRequest();
		var resText;
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200 || 201) {
				var resText = this.responseText;
				var res2 = JSON.parse(resText);
				var winnerID = res2.data[Math.floor(Math.random() * numMembers)].id;
				console.log("Winner ID: " + winnerID);
				awardWinner(chalID, winnerID);
			}
		};
		xhttp.open("GET", "https://habitica.com/api/v3/challenges/" + chalID + "/members", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.setRequestHeader("x-api-user", "fb308060-0861-42ac-8f79-72d2e52eb359");
		xhttp.setRequestHeader("x-api-key", "2c52e670-5a8c-49a8-89c0-de64e46c990c");
		xhttp.send();
	}, fInterval);
}

function withInterval() {
	//fullSequence();
	console.log(parseInt(fInterval));
	setInterval(function() {
		console.log(fName)
	}, parseInt(fInterval));
}