var hand = [];
var players = [];
var playerCount = 1;
var selectedCards = [];

function startPoker() {
	document.getElementById("Player-Count").value = 1;
	document.getElementById("Player-Count").addEventListener("change", playerChange, false);
	document.getElementById("New-Hand").addEventListener("click", getCards, false);
	document.getElementById("Check-Cards").addEventListener("click", getCardCheck, false);
	document.getElementById("Discard-Cards").addEventListener("click", discardSelectedCards, false);
	getCards();
};

function playerChange() {
	var playerNum = document.getElementById("Player-Count").value;
	if (playerNum > playerCount) {
		playerAdd(playerNum);
	}
	else if (playerNum < playerCount) {
		playerRemove(playerNum)
	}
	playerCount = document.getElementsByClassName("Hand").length;
};

function playerAdd(playerNum) {
	var div = document.createElement("div");
	div.id = "Player" + playerNum;
	div.classList.add("Hand");
	document.getElementById("Players").appendChild(div);
};

function playerRemove(playerNum) {
	players = document.getElementsByClassName("Hand");
	var newNum = playerNum - 1;
	players[newNum].parentNode.removeChild(players[newNum]);
};

function getCards() {
	players = document.getElementsByClassName("Hand");
	document.getElementById("Result").innerHTML = "???";
	
	for (var player in players) {
		hand = newHand();
		players[player].innerHTML = "";
		returnReadableCards(hand, players[player], ["Card"], selectCard);
	}
	document.getElementById("Result").innerHTML = "???";
};

function getCardCheck() {
	var answer = "";
	var winningStyle;
	var results = [];
	var playerHands = [];
	var players = document.getElementsByClassName("Hand");
	
	for (var player = 0; player < players.length; player++) {
		var getHand = [];
		for (var card in players[player].children) {
			if (players[player].children[card].nodeType == 1) {
				getHand.push(players[player].children[card].getAttribute("data-value"));
			}
		}
		playerHands.push(getHand);
	} //creates playerHands
	
	for (var pHand in playerHands) {
		var pResult = checkCards(playerHands[pHand]);
		results.push(pResult);
	};
	
	console.log("RESULTS: [" + results + "]");
	
	var highCardBool = true;
	var answerMax = 1;
	for (var result in results) {
		if (!(isNaN(results[result]))) {
			if (results[result] > answerMax) {
				answerMax = results[result];
			}
		};
	};
	
	if (answerMax == 1) {
		var highCardList = [];
		var highCardMax = 1.02;
		for (var highC in results) {
			highCardList.push(results[highC].split("|")[1]);
		}
		for (var highAns in highCardList) {
			if (highCardList[highAns] > highCardMax) {
				highCardMax = highCardList[highAns];
			};
		};
		
		var finalAnsw = findDuplicates(highCardList, highCardMax);
		console.log(finalAnsw);
		for (var answ in finalAnsw) {
			answer += "Player " + (parseInt(finalAnsw[answ]) + 1) + " ";
		}; 
	}
	else {
		var finalAnsw = findDuplicates(results, answerMax)
		console.log(finalAnsw);
		for (var answ in finalAnsw) {
			answer += "Player " + (parseInt(finalAnsw[answ]) + 1) + " ";
		}; 
	}
	
	switch (answerMax) {
		case 9:
			winningStyle = "Straight Flush";
			break;
		case 8:
			winningStyle = "4 of a Kind";
			break;
		case 7:
			winningStyle = "Full House";
			break;
		case 6:
			winningStyle = "Flush";
			break;
		case 5:
			winningStyle = "Straight";
			break;
		case 4:
			winningStyle = "3 of a Kind";
			break;
		case 3:
			winningStyle = "2 Pair";
			break;
		case 2:
			winningStyle = "1 Pair";
			break;
		default:
			winningStyle = "High Card"
			break;
	};
	
	document.getElementById("Result").innerHTML = "Winner(s):<br />" + answer + "<br />" + winningStyle;
};

function selectCard() {
	
	var selected = this.getAttribute("data-selected");
	var value = this.getAttribute("data-value");
	
	if (selected == 0) {
		this.setAttribute("data-selected", 1);
		this.style.borderColor = "#FEED34"
		selectedCards.push(parseFloat(value));
	}
	else {
		this.setAttribute("data-selected", 0);
		this.style.borderColor = this.style.color;
		selectedCards.splice(selectedCards.indexOf(parseFloat(value)), 1);
	};	
};

function discardSelectedCards() {
	var handDisplay = document.getElementById("Hand");
	
	if (selectedCards[0] != undefined) {
		hand = discardCards(hand, selectedCards);
		handDisplay.innerHTML = "";
		returnReadableCards(hand, handDisplay, ["Card"], selectCard);
	}
	else {
		alert("No cards selected!")
	};
	
	selectedCards = [];
};

function findDuplicates(array, search) {
	var duplic = [];
	for (var i = 0; i < array.length; i++) {
		if (array[i] == search) {
			duplic.push(i);
		}
	};
	return duplic;
};

window.addEventListener("load", startPoker, false);