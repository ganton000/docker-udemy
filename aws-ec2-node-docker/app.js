const path = require("path");
const fs = require("fs").promises;

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");

const app = express();

const PORT = 80;

// Set up middlewares
app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(bodyParser.urlencoded({ extended: true }));

// Helper Functions

const handle500error = (err, next) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
};

const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, "utf8");
        return data;
    } catch (err) {
        console.error(err);
    }
};

const writeFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, data);
    } catch (err) {
        console.error(err);
    }
};

// Routers & Controllers
app.post("/yoda", async (req, res, next) => {
    const { translate } = req.body;

    const filePath = path.join(__dirname, "views", "index.html");
    const fileContents = await readFile(filePath);
    const $ = cheerio.load(fileContents);

    try {
        const response = await axios.get(
            `https://api.funtranslations.com/translate/yoda.json?text=${translate}`
        );
        let translation = response?.data?.contents?.translated;

        $("form").replaceWith(`<p>${translation}</p>`);
        const html = $.html();
		res.status(200).send(html)
    } catch (err) {
        $("form").replaceWith(`<p>Sorry! Something went wrong!</p>`);
		$("img").attr("src", "../images/tommy-van-kessel-unsplash.jpg");
		$("img").attr("alt", "darth vader flexing bicep");
        const html = $.html();
		res.status(500).send(html)
    }
});

//app.get("/yoda", (req, res) => {
//    const filePath = path.join(__dirname, "views", "modified.html");
//    res.sendFile(filePath);
//});

app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "views", "index.html");
    res.sendFile(filePath);
});

// Error handling middleware

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({
        message,
        data,
    });
});

app.listen(PORT);
