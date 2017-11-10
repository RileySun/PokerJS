var hand = [];
var selectedCards = [];

function startPoker() {
	document.getElementById("New-Hand").addEventListener("click", getCards, false);
	document.getElementById("Check-Cards").addEventListener("click", getCardCheck, false);
	document.getElementById("Discard-Cards").addEventListener("click", discardSelectedCards, false);
	getCards();
};

function getCards() {
	hand = newHand();
	document.getElementById("Result").innerHTML = "???";
	var handDisplay = document.getElementById("Hand");
	handDisplay.innerHTML = "";
	returnReadableCards(hand, handDisplay, ["Card"], selectCard);
};

function getCardCheck() {
	var result = checkCards(hand);
	var answer;
	
	if (!(typeof result === 'string')) {
		switch (result) {
			case 9:
				answer = "Straight Flush";
				break;
			case 8:
				answer = "4 of a Kind";
				break;
			case 7:
				answer = "Full House";
				break;
			case 6:
				answer = "Flush";
				break;
			case 5:
				answer = "Straight";
				break;
			case 4:
				answer = "3 of a Kind";
				break;
			case 3:
				answer = "2 Pair";
				break;
			case 2:
				answer = "1 Pair";
				break;
			default:
				answer = "Error, Please Submit Support Ticket With Cards Suits And Values"
				break;
		};
	}
	else {
		answer = "High Card : " + result.split("|")[1];
	};
		
	document.getElementById("Result").innerHTML = answer;
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

window.addEventListener("load", startPoker, false);