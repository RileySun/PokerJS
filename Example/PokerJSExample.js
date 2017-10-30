var hand = [];

function startPoker() {
	document.getElementById("New-Hand").addEventListener("click", getCards, false);
	document.getElementById("Check-Cards").addEventListener("click", getCardCheck, false);
	getCards();
};

function getCards() {
	hand = newHand();
	document.getElementById("Result").innerHTML = "???";
	var handDisplay = document.getElementById("Hand");
	handDisplay.innerHTML = "";
	returnReadableCards(hand, handDisplay, ["Card"]);
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

window.addEventListener("load", startPoker, false);