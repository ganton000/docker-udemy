const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

//initialize client
app = express();

//Parse application/json requests
app.use(bodyParser.json());

app.get("/movies", async (req, res) => {
    try {
        const response = await axios.get("https://swapi.dev/api/films");
        res.status(200).json({
            movies: response.data,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
});

app.get("/people", async (req, res) => {
    try {
        const response = await axios.get("https://swapi.dev/api/people");
        res.status(200).json({
            people: response.data,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
});

mongoose
    .connect(process.env.MONGODB_URI,
		{ useNewUrlParser: true }
	)
    .then((result) => {
        const server = app.listen(process.env.PORT, () => {
            console.log(
                `Server is connected and listening in on PORT: ${process.env.PORT}`
            );
        });
	})
	.catch((err) => {
		console.log(err)
	})
