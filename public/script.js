	var counterLeft;
	var wrong = [];
	var win;

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
	   	wordOne = list[Math.floor(Math.random()*list.length)];
		wordOneSplit = wordOne.toUpperCase().split('');
		wordTwo = list[Math.floor(Math.random()*list.length)];
		wordTwoSplit = wordTwo.toUpperCase().split('');
		wordThree = list[Math.floor(Math.random()*list.length)];
		wordThreeSplit = wordThree.toUpperCase().split('');
		resetGame();
	}
	
	function letterPress(alpha) {
		var any = false;
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