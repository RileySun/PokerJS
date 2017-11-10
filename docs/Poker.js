/*
Poker JS - Javascript Poker Library
By RileySun

//Spade = 4, Heart = 3, Diamond = 2, Club = 1
//Cards = 2-14 (2-Ace)
*/

var Hand = [];

function newHand() {
	for (var i = 0; i < 5; i++) {
		var card = createCard();		
		if (Hand.length > 1) {
			for (j = 0; j < Hand.length; j++) {
				if (card == Hand[j]) {
					card = createCard();
				};
			};
		};//Make sure Not Duplicate (Serious Voodoo Code)
		Hand[i] = card;
	};
	return Hand;
};//Returns Hand in Array [card0, card1, card2, card3, card4]

function createCard() {
	var card = Math.floor((Math.random() * 4) + 1);
	var decimel = (Math.floor(Math.random() * (13 + 1)) + 1) / 100;
	if (decimel < 0.02) {
		decimel += decimel + 0.01;
	}
	card += decimel;
	return card;
};//Create Card Function

function discardCards(Hand, discardList) {
	for (var value in discardList) {
		var index = Hand.indexOf(discardList[value]);
		
		var newCard = createCard();
		if (Hand.length > 1) {
			for (j = 0; j < Hand.length; j++) {
				if (newCard == Hand[j]) {
					newCard = createCard();
				};
			};
		};
		
		Hand.splice(index, 1, newCard);
	};
	
	return Hand; 
	
}; //Discard certain Cards, Cards must be in Array even if only one card

function sortCards(Hand) {
	var sortedHand = Hand.sort();
	return sortedHand;
}; //Returns Cards Sorted By Suit

function sortValues(Hand) {
	var values = [];
	var tempValues = [];
	var sortedHand = [];
	
	for (var i = 0; i < 5; i++) {
		values[i] = {"suit": Math.floor(Hand[i]), "value": parseFloat((Hand[i] - (Math.floor(Hand[i]))).toFixed(2))};
	};
	tempValues = values.sort(function(a, b) {return b.value < a.value ?  1 : b.value > a.value ? -1 : 0;});
	
	for (var i = 0; i < 5; i++) {
		sortedHand[i] = tempValues[i].suit + tempValues[i].value;
	};
	
	return sortedHand;
}; //Returns Cards Sorted By Value

//All Functions Below Return True or False

//Use Suit Sort
function checkFlush(sortedHand) {
	var flushBool = false;
	var suit = Math.floor(sortedHand[0]);
	
	for (var card in sortedHand) {
		if (Math.floor(sortedHand[card]) == suit) {
			flushBool = true
		}
		else {
			flushBool = false;
			return flushBool
		};
	};
	
	return flushBool;
};

function checkStraight(sortedHand) {
	var straightBool = false;
	var aceBool = false
	var values = [];
	
	for (var i = 0; i < 5; i++) {
		//HOLY SHIT BALLS FUCK FLOATS FUCK FLOATS FUCK FLOATS
		values[i] = parseFloat((sortedHand[i] - (Math.floor(sortedHand[i]))).toFixed(2));
		if (values[i] == 0.14) {
			aceBool = true;
		};
	};

	if (aceBool) {
		//Pretty Crazy Bool Check, Gotta Find A Way To Simplify This With Math
		if ((values[0] == 0.11 && values[1] == 0.12 && values[2] == 0.13 && values[3] == 0.14 && values[4] == 0.02) || (values[0] == 0.12 && values[1] == 0.13 && values[2] == 0.14 && values[3] == 0.02 && values[4] == 0.03) || (values[0] == 0.13 && values[1] == 0.14 && values[2] == 0.02 && values[3] == 0.03 && values[4] == 0.04) || (values[0] == 0.14 && values[1] == 0.02 && values[2] == 0.03 && values[3] == 0.04 && values[4] == 0.05)) {
			straightBool = true;
			return straightBool;
		}
		else {
			return straightBool;
		};
		
	}
	else {
		for (var i = 0; i < 5; i++) {
			if (values[i+1] == (Math.floor(((values[i] + 0.01) * 100)))/100) {
				 straightBool = true;
			}
			else {
				 straightBool = false;
			};
		};
		return straightBool;
	}
};

//Use Value Sort
function check4Kind(sortedHand) {
	var kind4Bool = false;
	var values = [];
	
	for (var i = 0; i < 5; i++) {

		values[i] = parseFloat((sortedHand[i] - (Math.floor(sortedHand[i]))).toFixed(2));
	};
	if ( (values[0] == values[1] && values[1] == values[2] && values[2] == values[3]) || (values[1] == values[2] && values[2] == values[3] && values[3] == values[4]) ) {
		kind4Bool = true;
	};
	return kind4Bool;
};

function checkFullHouse(sortedHand) {
	var fullHouseBool = false;
	var values = [];
	
	for (var i = 0; i < 5; i++) {

		values[i] = parseFloat((sortedHand[i] - (Math.floor(sortedHand[i]))).toFixed(2));
	};
	if ( (values[0] == values[1] && values[1] == values[2] && values[3] == values[4]) || (values[0] == values[1] && values[2] == values[3] && values[3] == values[4]) ) {
		fullHouseBool = true;
	}
	
	return fullHouseBool;
};

function check3Kind(sortedHand) {
	var kind3Bool = false;
	var values = [];
	
	for (var i = 0; i < 5; i++) {
		values[i] = parseFloat((sortedHand[i] - (Math.floor(sortedHand[i]))).toFixed(2));
	};
	if ( (values[0] == values[1] && values[1] == values[2]) || (values[1] == values[2] && values[2] == values[3]) || (values[2] == values[3] && values[3] == values[4]) ) {
		kind3Bool = true;
	};
	return kind3Bool;
};

function check2Pair(sortedHand) {
	var pair2Bool = false;
	var values = [];
	
	for (var i = 0; i < 5; i++) {
		values[i] = parseFloat((sortedHand[i] - (Math.floor(sortedHand[i]))).toFixed(2));
	};
	if ( (values[0] == values[1] && values[2] == values[3]) || (values[0] == values[1] && values[3] == values[4]) || (values[1] == values[2] && values[3] == values[4]) ) {
		pair2Bool = true;
	};
	
	return pair2Bool;
};

function checkPair(sortedHand) {
	var pairBool = false;
	var values = [];
	
	for (var i = 0; i < 5; i++) {
		values[i] = parseFloat((sortedHand[i] - (Math.floor(sortedHand[i]))).toFixed(2));
	};
	if (values[0] == values[1] || values[1] == values[2] || values[2] == values[3] || values[3] == values[4]) {
		pairBool = true;
	};
	
	return pairBool;
};

function getHighCard(sortedHand) {
	var highCard = sortedHand.pop();
	
	highCard = parseFloat((highCard - (Math.floor(highCard))).toFixed(2)) * 100;
	
	switch (Math.floor(highCard)) {
		case 11:
			highCard = "J";
			break;
		case 12:
			highCard = "Q";
			break;
		case 13:
			highCard = "K";
			break;
		case 14:
			highCard = "A";
			break;
		default:
			break;
	};
	
	return highCard;
};

//Check If Any Were Triggered (If High Card, returns string as 1|valueOfHighCard)
function checkCards(hand) {
	if (checkFlush(sortCards(Hand)) && checkStraight(sortCards(Hand))) {
		result = 9;
	}	//9 (Straight Flush)
	else if (check4Kind(sortValues(Hand))) {
		result = 8;
	}								//8 (4 of a Kind)
	else if (checkFullHouse(sortValues(Hand))) {
		result = 7;
	}							//7 (Full House)
	else if (checkFlush(sortCards(Hand))) {
		result = 6;
	}									//6 (Flush)
	else if (checkStraight(sortCards(Hand))) {
		result = 5;
	}								//5 (Straight)
	else if (check3Kind(sortValues(Hand))) {
		result = 4;
	}								//4 (3 of a Kind)
	else if (check2Pair(sortValues(Hand))) {
		result = 3;
	}								//3 (2 Pair)
	else if (checkPair(sortValues(Hand))) {
		result = 2;
	}									//2 (1 Pain)
	else {
		var highCard = getHighCard(sortValues(Hand));
		result = 1 + "|" + highCard;
	}																	//1|highCard (High Card)
	return result;
};

//Return Card List, Appends to target adds classes (classes must be array to account for multiple classes)
//selectFunction is an optional addition that allows you to assign a function to the card that allows it to be selected.
function returnReadableCards(hand, target, classes, selectFunction) {
	var num = 0;
	for (var card in hand) {
		var cardDisplay = document.createElement("div");
		
		for (var c = 0; c < classes.length; c++) {
			cardDisplay.classList.add(classes[c]);
		};
		
		var values = [];
		for (var i = 0; i < 5; i++) {
			values[i] = {"suit": Math.floor(Hand[card]), "value": parseFloat((Hand[card] - (Math.floor(Hand[card]))).toFixed(2))};
			switch (values[i].suit) {
				case 4:
					cardDisplay.innerHTML = "&spades;";
					break;
				case 3:
					cardDisplay.innerHTML = "&hearts;";
					break;
				case 2:
					cardDisplay.innerHTML = "&diams;";
					break;
				case 1:
					cardDisplay.innerHTML = "&clubs;";
					break;
				default:
					break;
			}

			switch (Math.floor(values[i].value * 100)) {
				case 11:
					cardDisplay.innerHTML += "J";
					break;
				case 12:
					cardDisplay.innerHTML += "Q";
					break;
				case 13:
					cardDisplay.innerHTML += "K";
					break;
				case 14:
					cardDisplay.innerHTML += "A";
					break;
				default:
					cardDisplay.innerHTML += Math.floor(values[i].value * 100);
			};
			
			if (values[i].suit == 1 || values[i].suit == 4) {
				cardDisplay.style.color = "#000";
				cardDisplay.style.borderColor = "#000";
			}
			else {
				cardDisplay.style.color = "#C00";
				cardDisplay.style.borderColor = "#C00";
			}
		};
		
		if (selectFunction != undefined) {
			cardDisplay.addEventListener("click", selectFunction, false);
		};
		
		cardDisplay.setAttribute("data-selected", 0);
		cardDisplay.setAttribute("data-value", Hand[card]);
		
		target.appendChild(cardDisplay);
	};
};