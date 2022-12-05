const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = 8080;

let userGoal = "Get Rich Quick";

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send(`
		<html>
			<head>
				<link rel="stylesheet" href="styles.css">
			</head>
			<body>
				<section>
					<h2>Judy's Finance Tracker</h2>
					<h3>${userGoal}</h3>
				</section>
				<form action="/expenses" method="POST">
					<div class="form-control">
						<label>Clothes</label>
						<input type="text" name="clothes">
					</div>
					<button>Set Clothing Expenses</button>
				</form>
			</body>
		</html>
	`);
});

app.post("/expenses", (req, res) => {
    userGoal = req.body.clothes;
    res.redirect("/");
});

app.listen(PORT);
