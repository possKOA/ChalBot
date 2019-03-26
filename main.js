var fName;
var fShort;
var fSummary;
var fDescription;
var fPrize;
var fInterval;
var fGroup;
var fFreq;
var fCustomOrSet;
var fMessage;
var fMessageGroup;
var fHorace;
var uuid;
var apikey;
var numMembers;
var repeat;
var firstTime = true;
var winnerAlias;
var hasSentMessage;

//Task slots
var task1;
var task2;
var task3;
var task4;
var task5;
var task6;
var task7;
var task8;
var task9;
var task10;
var tasks = [];

function joinChallenge(challengeid) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200 || 201) {
			//document.getElementById("demo").innerHTML = "";
		}
	};
	xhttp.open("POST", "https://habitica.com/api/v3/challenges/" + challengeid + "/join", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.setRequestHeader("x-api-user", uuid);
	xhttp.setRequestHeader("x-api-key", apikey);
	xhttp.send();
}

function getChal() {
	var xhttp2 = new XMLHttpRequest();
		xhttp2.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var resText2 = this.responseText;
				var res3 = JSON.parse(resText2);
				document.getElementById("demo").innerHTML = this.responseText;
				
			}
		};
		xhttp2.open("GET", "https://habitica.com/api/v3/challenges/af23c110-c1c8-46d4-ba4a-591263df1a5e/members", true);
		xhttp2.setRequestHeader("x-api-user", uuid);
		xhttp2.setRequestHeader("x-api-key", apikey);
		xhttp2.send();
}

function getCreds() {
	var x = document.getElementById("userCreds");
	uuid = x.elements[0].value;
	apikey = x.elements[1].value;
	document.getElementById("demo").innerHTML = uuid + " " + apikey;
	x.reset();
}

function sendToBoard(link, withWinner, winnerName, group, customorset) {
	if(customorset == "tavernbulletin") {
		var fmodmessage = fMessage;
		fmodmessage = fMessage.replace(/LINK/g, "https://habitica.com/challenges/" + link) + "%0D%0A%0D%0A :trophy: **Last Weeks Winner:** @" + winnerName;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200 || 201) {
				//document.getElementById("demo").innerHTML = "Message posted";
			}
		};
		xhttp.open("POST", "https://habitica.com/api/v3/groups/tavern/chat", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.setRequestHeader("x-api-user", uuid);
		xhttp.setRequestHeader("x-api-key", apikey);
		xhttp.send("message=" + fmodmessage);

		/*var fmodmessage = fMessage;
		fmodmessage = fMessage.replace(/LINK/g, "https://habitica.com/challenges/" + link) + "%0D%0A%0D%0A :trophy: **Last Weeks Winner:** @" + winnerName;
		*/
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200 || 201) {
				//document.getElementById("demo").innerHTML = "Message posted";
			}
		};
		xhttp.open("POST", "https://habitica.com/api/v3/groups/d6295936-7106-41d4-b90c-f22bdca3303b/chat", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.setRequestHeader("x-api-user", uuid);
		xhttp.setRequestHeader("x-api-key", apikey);
		xhttp.send("message=" + fmodmessage);
	} else if(customorset == "custom") {
		var fmodmessage = fMessage;
		fmodmessage = fMessage.replace(/LINK/g, "https://habitica.com/challenges/" + link) + "%0D%0A%0D%0A :trophy: **Last Weeks Winner:** @" + winnerName;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200 || 201) {
				//document.getElementById("demo").innerHTML = "Message posted";
			}
		};
		xhttp.open("POST", "https://habitica.com/api/v3/groups/" + group + "/chat", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.setRequestHeader("x-api-user", uuid);
		xhttp.setRequestHeader("x-api-key", apikey);
		xhttp.send("message=" + fmodmessage);
	}
	
}

function getForm() {
	var x = document.getElementById("chalForm");
	fName = x.elements[0].value;
	fShort = x.elements[1].value;
	fSummary = x.elements[2].value;
	fDescription = x.elements[3].value;
	fDescription = fDescription.replace(/(?:\r\n|\r|\n)/g, "%0D%0A");
	fDescription = fDescription.replace(/&/g, "%26");
	fPrize = x.elements[4].value;
	fInterval = x.elements[5].value;
	fGroup = x.elements[6].value;
	fFreq = x.elements[7].value;
	fCustomOrSet = x.elements[8].value;
	fMessage = x.elements[9].value;
	fMessage = fMessage.replace(/&/g, "%26");
	fMessageGroup = x.elements[10].value;
	fHorace = x.elements[11].value;
	document.getElementById("demo").innerHTML = fName + "<br>" + fShort + "<br>" + fSummary + "<br>" + fDescription + "<br>" + fPrize + "<br>" + fInterval + "<br>" + fGroup;
}

/*function createChallenge(name, shortName, summary, description) {
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
	xhttp.setRequestHeader("x-api-user", uuid);
	xhttp.setRequestHeader("x-api-key", apikey);
	xhttp.send("group=" + fGroup + "&name=" + fName + "&shortName=" + fShort + "&summary=" + fSummary + "&description=" + fDescription);
}*/

function awardWinner(challengeID, winnersID) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("demo").innerHTML = this.responseText;
		}
	};
	xhttp.open("POST", "https://habitica.com/api/v3/challenges/" + challengeID + "/selectWinner/" + winnersID, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.setRequestHeader("x-api-user", uuid);
	xhttp.setRequestHeader("x-api-key", apikey);
	xhttp.send("");
}

function fullSequence() {
	var winnerID;
	var chalID;
	//create challenge
	var xhttp = new XMLHttpRequest();
	var resText;
	var hasSent = false;
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200 || 201) {
			resText = this.responseText;
			var res2 = JSON.parse(resText);
			chalID = res2.data.id;
			document.getElementById("demo").innerHTML = "Challenge URL: https://habitica.com/challenges/" + chalID;
			if(hasSent == false) {
				var i;
				for (i = 0; i < tasks.length; i++) {
					submitTasks(tasks[i].text, tasks[i].type, tasks[i].notes, tasks[i].pos, tasks[i].neg, tasks[i].cost, tasks[i].diff, chalID);
				}
				hasSent = true;
				firstTime = false;
				if(fHorace == "true") {
					joinChallenge(chalID);
				} else {
					console.log("horace did not join your challenge");
				}
			}
		}
	};
	xhttp.open("POST", "https://habitica.com/api/v3/challenges/", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.setRequestHeader("x-api-user", uuid);
	xhttp.setRequestHeader("x-api-key", apikey);
	xhttp.send("group=" + fGroup + "&name=" + fName + " | " + String(getDates(fFreq)) + "&shortName=" + fShort + "&summary=" + fSummary + "&description=" + fDescription);
	
	setTimeout(function() {
		//get challenge, choose winner
		var xhttp2 = new XMLHttpRequest();
		xhttp2.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var resText2 = this.responseText;
				var res3 = JSON.parse(resText2);
				numMembers = res3.data.memberCount;
				if(numMembers == 0) {
					document.getElementById("demo").innerHTML = "No one joined your challenge :(";
				}
			}
		};
		xhttp2.open("GET", "https://habitica.com/api/v3/challenges/" + chalID, true);
		xhttp2.setRequestHeader("x-api-user", uuid);
		xhttp2.setRequestHeader("x-api-key", apikey);
		xhttp2.send();
		console.log("Number of members: " + numMembers);
		if(numMembers == 0) {
			document.getElementById("demo").innerHTML = "No one joined your challenge :(";
		} else {
			var xhttp = new XMLHttpRequest();
			var resText;
			hasSentMessage = false;
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200 || 201) {
					resText = this.responseText;
					var res2 = JSON.parse(resText);
					var rand = Math.floor(Math.random() * numMembers);
					winnerID = res2.data[parseInt(rand)].id;
					winnerAlias = res2.data[parseInt(rand)].profile.name;
					console.log("Winner: " + winnerAlias);
					awardWinner(chalID, winnerID);
					if(!hasSentMessage) {
						if(fIncludeMessage == "true") {
							sendToBoard(chalID, firstTime, String(winnerAlias), fMessageGroup, fCustomOrSet);
						} else {
							console.log("Message disabled");
						}
						hasSentMessage = true;
					}
				}
			};
			xhttp.open("GET", "https://habitica.com/api/v3/challenges/" + chalID + "/members", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.setRequestHeader("x-api-user", uuid);
			xhttp.setRequestHeader("x-api-key", apikey);
			xhttp.send();
		}
		
	}, fInterval - 2000);
}

function submitTasks2() {
	var i;
	for (i = 0; i < tasks.length; i++) {
		submitTasks(tasks[i].text, tasks[i].type, tasks[i].notes, tasks[i].pos, tasks[i].neg, tasks[i].cost, tasks[i].diff, tasks[i].chal);
	}
}

function withInterval() {
	var intervalNum = parseInt(fInterval);
	fullSequence();
	repeat = setInterval("fullSequence()", intervalNum);
}

function stopRepeat() {
	clearInterval(repeat);
}

function getDates(isWeekly) {
	var sun;
	var nextSun;
	var now = new Date();
	var day = now.getDay();
	var date = now.getDate();
	var month = now.getMonth() + 1;
	var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var chalMonth = months[now.getMonth()];
	var chalMonth2;
	console.log("Days in the current month: " + monthDays[now.getMonth()]);

	if(day != 0) {
		sun = (day + 1 - 8) * -1
		sun += date
		console.log(suffixify(date + sun));
	} else {
		sun = date;
	}

	if(parseInt(sun) + 7 > monthDays[now.getMonth()]) {
		nextSun = parseInt(sun) + 7 - 31;
		console.log("Next Sunday on: " + suffixify(nextSun));
		var nextMonth = parseInt(now.getMonth()) + 1;
		console.log(nextMonth);
		chalMonth2 = months[parseInt(nextMonth)];
	} else {
		nextSun = parseInt(sun) + 7;
		chalMonth2 = chalMonth;
	}
	console.log(chalMonth + " " + suffixify(sun) + " - " + chalMonth2 + " " + suffixify(String(nextSun)));
	if(isWeekly == "true") {
		return chalMonth + " " + suffixify(sun) + " - " + chalMonth2 + " " + suffixify(String(nextSun));
	} else if (isWeekly == "false") {
		return chalMonth;
	}
}

function suffixify(text) {
	var num = parseInt(text);
	var numSplit = String(text).split("");
	var lastDigit = numSplit[numSplit.length - 1]
	if(num == 1 || lastDigit == 1) {
		return text + "st";
	} else if(num == 2 || lastDigit == 2) {
		return text + "nd";
	} else if(num == 3 || lastDigit == 3) {
		return text + "rd";
	} else {
		return text + "th";
	}
}

function Task(text, type, notes, diff, pos, neg, cost, chal) {
	this.text = text;
	this.type = type;
	this.notes = notes;
	this.diff = diff;
	this.pos = pos;
	this.neg = neg;
	this.cost = cost;
	this.chal = chal;
}
function submitTasks(text, type, notes, pos, neg, cost, diff, chal) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200 || 201) {
			var resText = this.responseText;
			var res2 = JSON.parse(resText);
			chalID = res2.data.id;
			document.getElementById("taskoutput").innerHTML = type + " '" + text + "' added!";
		}
	};
	xhttp.open("POST", "https://habitica.com/api/v3/tasks/challenge/" + chal, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.setRequestHeader("x-api-user", uuid);
	xhttp.setRequestHeader("x-api-key", apikey);
	xhttp.send("text=" + text + "&type=" + type + "&notes=" + notes + "&up=" + pos + "&down=" + neg + "&value=" + cost + "&priority=" + diff);
}

function addTask() {
	var y = document.getElementById("tasks");
	if(task1 == undefined) {
		console.log("this bit works");
		console.log("y.elements[0].value: " + y.elements[0].value);
		task1 = new Task(y.elements[0].value, y.elements[1].value, y.elements[2].value.replace(/(?:\r\n|\r|\n)/g, "%0D%0A").replace(/&/g, "%26"),  y.elements[3].value, y.elements[4].value, y.elements[5].value, y.elements[6].value);
		console.log(task1.text);
		tasks.push(task1);
	}else if (task2 == undefined) {
		console.log("this bit works 2");
		task2 = new Task(y.elements[0].value, y.elements[1].value, y.elements[2].value.replace(/(?:\r\n|\r|\n)/g, "%0D%0A").replace(/&/g, "%26"),  y.elements[3].value, y.elements[4].value, y.elements[5].value, y.elements[6].value);
		console.log(task2.text);
		tasks.push(task2);
	}else if (task3 == undefined) {
		console.log("this bit works 3");
		task3 = new Task(y.elements[0].value, y.elements[1].value, y.elements[2].value.replace(/(?:\r\n|\r|\n)/g, "%0D%0A").replace(/&/g, "%26"),  y.elements[3].value, y.elements[4].value, y.elements[5].value, y.elements[6].value);
		console.log(task3.text);
		tasks.push(task3);
	}else if (task4 == undefined) {
		console.log("this bit works 4");
		task4 = new Task(y.elements[0].value, y.elements[1].value, y.elements[2].value.replace(/(?:\r\n|\r|\n)/g, "%0D%0A").replace(/&/g, "%26"),  y.elements[3].value, y.elements[4].value, y.elements[5].value, y.elements[6].value);
		console.log(task4.text);
		tasks.push(task4);
	}else if (task5 == undefined) {
		console.log("this bit works 5");
		task5 = new Task(y.elements[0].value, y.elements[1].value, y.elements[2].value.replace(/(?:\r\n|\r|\n)/g, "%0D%0A").replace(/&/g, "%26"),  y.elements[3].value, y.elements[4].value, y.elements[5].value, y.elements[6].value);
		console.log(task5.text);
		tasks.push(task5);
	}else if (task6 == undefined) {
		console.log("this bit works 6");
		task6 = new Task(y.elements[0].value, y.elements[1].value, y.elements[2].value.replace(/(?:\r\n|\r|\n)/g, "%0D%0A").replace(/&/g, "%26"),  y.elements[3].value, y.elements[4].value, y.elements[5].value, y.elements[6].value);
		console.log(task6.text);
		tasks.push(task6);
	}else if (task7 == undefined) {
		console.log("this bit works 7");
		task7 = new Task(y.elements[0].value, y.elements[1].value, y.elements[2].value.replace(/(?:\r\n|\r|\n)/g, "%0D%0A").replace(/&/g, "%26"),  y.elements[3].value, y.elements[4].value, y.elements[5].value, y.elements[6].value);
		console.log(task7.text);
		tasks.push(task7);
	}else if (task8 == undefined) {
		console.log("this bit works 8");
		task8 = new Task(y.elements[0].value, y.elements[1].value, y.elements[2].value.replace(/(?:\r\n|\r|\n)/g, "%0D%0A").replace(/&/g, "%26"),  y.elements[3].value, y.elements[4].value, y.elements[5].value, y.elements[6].value);
		console.log(task8.text);
		tasks.push(task8);
	}else if (task9 == undefined) {
		console.log("this bit works 9");
		task9 = new Task(y.elements[0].value, y.elements[1].value, y.elements[2].value.replace(/(?:\r\n|\r|\n)/g, "%0D%0A").replace(/&/g, "%26"),  y.elements[3].value, y.elements[4].value, y.elements[5].value, y.elements[6].value);
		console.log(task9.text);
		tasks.push(task9);
	}else if (task10 == undefined) {
		console.log("this bit works 10");
		task10 = new Task(y.elements[0].value, y.elements[1].value, y.elements[2].value.replace(/(?:\r\n|\r|\n)/g, "%0D%0A").replace(/&/g, "%26"),  y.elements[3].value, y.elements[4].value, y.elements[5].value, y.elements[6].value);
		console.log(task10.text);
		tasks.push(task10);
	}else {
		console.log("limit reached");
		document.getElementById("demo").innerHTML = "Limit of 10 tasks reached!"
	}
	var textoutput = "";
	var i;
	for (i = 0; i < tasks.length; i++) {
		textoutput += tasks[i].text + "<br>";
	}
	document.getElementById("taskoutput").innerHTML = textoutput;
}