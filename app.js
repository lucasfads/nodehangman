require('dotenv').config()

var express = require("express"),
    app = express(),
    request = require('request');

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("themes");
})

app.get("/g/:theme", function(req, res){
	var theme = req.params.theme;
	var themeJson = "https://listsdesign.herokuapp.com/lists/" + theme + ".json"
	request(themeJson, function (error, response, body) {
		if(!error && response.statusCode == 200) {
			var parsedData = JSON.parse(body);
			res.render("hangman", {parsedData: parsedData, theme: theme});
		}
	})
})

app.listen(process.env.PORT || 3000, function(){
  console.log("The man will be hanged");
})