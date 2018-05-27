	var game = false;
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
	   	wordOne = list[Math.floor(Math.random()*list.length)];
		wordOneSplit = wordOne.toUpperCase().split('');
		wordTwo = list[Math.floor(Math.random()*list.length)];
		wordTwoSplit = wordTwo.toUpperCase().split('');
		wordThree = list[Math.floor(Math.random()*list.length)];
		wordThreeSplit = wordThree.toUpperCase().split('');
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