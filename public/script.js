	var game = false;
	var hint;
	var wordOne;
	var wordOneSplit;
	var wrong = [];

	function setLettersLoop(split, line) {
		for (var i = 0; i < split.length; i++) {
			if (split[i] == " ") {
				document.getElementById(line).innerHTML += "<span class='space'></span>";
			} else {
				document.getElementById(line).innerHTML += "<span class='letter'></span>";
			}
		}
	}

	function setLetters() {
		setLettersLoop(wordOneSplit, "line1");
		setLettersLoop(wordTwoSplit, "line2");
		setLettersLoop(wordThreeSplit, "line3");
	}

	function resetGame() {
		if (game == true) {
			document.getElementById("letter").value = "";
			document.getElementById("line1").innerHTML = "";
			document.getElementById("line2").innerHTML = "";
			document.getElementById("line3").innerHTML = "";
			setLetters();
			wrong = [];
			document.getElementById("wrong-list").innerHTML = "";
		}
	}
	
	function newGame() {
		resetGame();
		hint  = prompt("What is the hint?", "HINT");
	   	wordOne = prompt("First word to be guessed:", "WORD ONE");
		wordOneSplit = wordOne.toUpperCase().split('');
		wordTwo = prompt("Second word to be guessed:", "WORD TWO");
		wordTwoSplit = wordTwo.toUpperCase().split('');
		wordThree = prompt("Third word to be guessed:", "WORD THREE");
		wordThreeSplit = wordThree.toUpperCase().split('');
		document.getElementById("hint").innerHTML = hint;
		document.getElementById("line1").innerHTML = "";
		document.getElementById("line2").innerHTML = "";
		document.getElementById("line3").innerHTML = "";
		setLetters();
		game = true;
	}
	
	function letterPress(alpha) {
		var any = false;
		if (game == true) {
			function checkLetterLoop(split, line) {
				for (var i = 0; i < split.length; i++) {
					if (alpha == split[i]) {
						var j
						j = i + 1;
						document.querySelector("#" + line + " span:nth-child(" + j + ")").innerHTML = split[i];
						any = true;
					}
				}
			}
			checkLetterLoop(wordOneSplit, "line1");
			checkLetterLoop(wordTwoSplit, "line2");
			checkLetterLoop(wordThreeSplit, "line3");
			
			if (any == false && wrong.indexOf(alpha) < 0) {
				wrong.push(alpha);
				document.getElementById("wrong-list").innerHTML += "<span>" + alpha + "</span>";
			}
		}
		document.getElementById("letter").value = "";
		
	}