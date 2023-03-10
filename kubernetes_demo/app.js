const express = require('express');


app = express();

app.get("/", (req, res, next) => {
	res.send(`
	    <h1>Hello from Kubernetes Demo!</h1>
		<p>Try sending a request to /error</p>
	`);
});

app.get("/error", (req, res, next) => {
	process.exit(1);
});

app.listen(8080);