const path = require("path");
//Path to this file
// console.log(__filename);
//Path to this directory
// console.log(__direname);
// console.log(path.join(__dirname, "../public"));

//allows to get paths


const express = require("express");



const app = express();

//// Static imports

//app.com, //app.com/about, //app.com/help 
const pathToIndex = path.join(__dirname, "../public/") //imports all so below imports are futile
app.use(express.static(pathToIndex))

// const pathToHelp = path.join(__dirname, "../public/help.html") //Method that joins its arguments
// app.use(express.static(pathToHelp));

// const pathToAbout = path.join(__dirname, "../public/about.html")
// app.use(express.static(pathToAbout));


//app.com/weather
app.get("/weather", (request, response)=>{
    response.send({
        forecast: "placeholderForecast",
        location: "placeholderLocation"
    })
})