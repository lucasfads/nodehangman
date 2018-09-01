	var counterLeft;
	var wrong = [];
	var mistakes = 0;
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
		document.getElementById("line1").innerHTML = "";
		document.getElementById("line2").innerHTML = "";
		document.getElementById("line3").innerHTML = "";
		setLetters();
		counterLeft = 6;
		wrong = [];
		mistakes = 0;
		var faded = document.querySelectorAll(".fade");
		for (var i = 0; i < faded.length; i++) {
			faded[i].classList.remove("fade");
		}
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
		
		var alphaId = alpha.toLowerCase();
		document.getElementById(alphaId).classList.add("fade");
	
		if (any == false && wrong.indexOf(alpha) < 0) {
			wrong.push(alpha);
			counterLeft = 6 - wrong.length;
			mistakes += 1;
			document.querySelector("#lifes li:nth-child(" + mistakes + ")").classList.add("fade");
			if (counterLeft == 0) {
				youLose()
			}
		}

		function alert() {
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

	document.addEventListener('keydown', (event) => {
	  const keyName = event.key;
	  letterPress(keyName.toUpperCase());
	});

	var virtualKeys = document.querySelectorAll(".key");

	for (var i = 0; i < virtualKeys.length; i++) {
		virtualKeys[i].addEventListener('click', function() {
		  	letterPress(this.innerHTML.toUpperCase());
		})
	}


	window.onload = newGame;


	var qwertyButton = document.querySelector('#qwerty');
	var numsButton = document.querySelector('#numbers');
	var qwertyKeyboard = document.querySelector('#keys-alpha')
	var numsKeyboard = document.querySelector('#keys-nums')

	qwertyButton.onclick = function() {
		qwertyButton.classList.toggle('active');
		numsButton.classList.toggle('active');
	  	qwertyKeyboard.classList.toggle('hidden-keyboard');
	  	numsKeyboard.classList.toggle('hidden-keyboard'); 
	}

	numsButton.onclick = function() {
		qwertyButton.classList.toggle('active');
		numsButton.classList.toggle('active');
	  	qwertyKeyboard.classList.toggle('hidden-keyboard');
	  	numsKeyboard.classList.toggle('hidden-keyboard'); 
	}