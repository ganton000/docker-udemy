const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios")

const Favorite = require("./models/favorite");

require("dotenv").config();

//initialize client
app = express();

//Parse application/json requests
app.use(bodyParser.json());

//Routes
app.get("favorites", async (req, res) => {
	const favorites = await Favorite.find();
	res.status(200).json({
		favorites
	})
});

app.post("/favorites", async (req, res) => {
	const favName = req.body.name;
	const favType = req.body.type;
	const favUrl = req.body.url;

	try {
		if (favType !== "movie" && favType !== "character") {
			throw new Error('"type" should be "movie" or "character"!')
		}
		const existingFav = await Favorite.findOne({ name: favName });

		if (existingFav) {
			throw new Error("Favorite exists already!")
		}
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}

	const favorite = new Favorite({
		name: favName,
		type: favType,
		url: favUrl
	})

	try {
		await favorite.save();
		res.status(201).json({
			message: "Favorite saved!",
			favorite: favorite.toObject.
		})
	} catch (error) {
		res.status(500).json({ message: "Something went wrong." });
	}
});

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
