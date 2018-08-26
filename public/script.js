	var counterLeft;
	var wrong = [];
	var win;

	function setLettersLoop(words, line) {
		for (var h = 0; h < words.length; h++) {
			document.getElementById(line).innerHTML += "<span class='word word-" + h + "'></span>";
			letters = words[h].split('')
			for (var i = 0; i < letters.length; i++) {
				document.querySelector("#" + line + " .word-" + h).innerHTML += "<span class='letter'></span>";
			}
		}
	}

	function setLetters() {
		setLettersLoop(wordOneWords, "line1");
		setLettersLoop(wordTwoWords, "line2");
		setLettersLoop(wordThreeWords, "line3");
	}

	function resetGame() {
		document.querySelector("#overlay").classList.remove("overlay-show");
		document.querySelector("#overlay").classList.add("overlay-hide");
		document.getElementById("letter").value = "";
		document.getElementById("line1").innerHTML = "";
		document.getElementById("line2").innerHTML = "";
		document.getElementById("line3").innerHTML = "";
		setLetters();
		counterLeft = 6;
		document.querySelector("#counter span").innerHTML = counterLeft;
		wrong = [];
		document.getElementById("wrong-list").innerHTML = "";
		document.getElementById("letter").focus();
	}
	
	function newGame() {
	   	wordOne = list[Math.floor(Math.random()*list.length)].data;
		wordOneWords = wordOne.toUpperCase().split(' ');
		wordTwo = list[Math.floor(Math.random()*list.length)].data;
		wordTwoWords = wordTwo.toUpperCase().split(' ');
		wordThree = list[Math.floor(Math.random()*list.length)].data;
		wordThreeWords = wordThree.toUpperCase().split(' ');
		resetGame();
	}
	
	function letterPress(alpha) {
		var any = false;
		function checkLetterLoop(words, line) {
			for (var h = 0; h < words.length; h++) {
				letters = words[h].split('')
				for (var i = 0; i < letters.length; i++) {
					if (alpha == letters[i]) {
						var j
						j = i + 1;
						document.querySelector("#" + line + " .word-" + h + " span:nth-child(" + j + ")").innerHTML = letters[i];
						any = true;
					}
				}
			}
		}
		checkLetterLoop(wordOneWords, "line1");
		checkLetterLoop(wordTwoWords, "line2");
		checkLetterLoop(wordThreeWords, "line3");
	
		if (any == false && wrong.indexOf(alpha) < 0) {
			wrong.push(alpha);
			counterLeft = 6 - wrong.length;
			document.querySelector("#counter span").innerHTML = counterLeft;
			document.getElementById("wrong-list").innerHTML += "<span>" + alpha + "</span>";
			if (counterLeft == 0) {
				youLose()
			}
		}
	
		document.getElementById("letter").value = "";

		function alert() {
			document.getElementById("letter").blur();
			document.querySelector("#overlay").classList.remove("overlay-hide");
			document.querySelector("#overlay").classList.add("overlay-show");
		}

		function youLose() {
			document.querySelector("#alert").innerHTML = "You Lose!";
			alert();
		}

		function youWin() {
			document.querySelector("#alert").innerHTML = "You Win!";
			alert();
		}

		function checkWin() {
			win = true
			var allLetters = document.querySelectorAll(".letter")
			for (var i = 0; i < allLetters.length; i++) {
				if (allLetters[i].innerHTML == "") {
					win = false
				}
			}
			if (win == true) {
				youWin()
			}
		}
		checkWin()
	}

	window.onload = newGame;