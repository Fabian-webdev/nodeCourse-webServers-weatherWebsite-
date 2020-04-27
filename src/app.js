// import path from "path";
// import express from "express";
// import hbs from "hbs";
// import {getGeoCode} from "./utils/getGeoCode.js";
// import {getWeather} from "./utils/getWeather.js";

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getGeoCode = require("./utils/getGeoCode.js");
const getWeather = require("./utils/getWeather.js");


const app = express();
const port = process.env.PORT || 3000;
// let importMeta = new URL(import.meta.url).pathname; //import path to directory with import.meta
// importMeta = importMeta.replace("/C", "C"); //replacing "/C" at beginning of path string with C
// const __dirname = path.join(importMeta, "../../public"); // Setting __dirname to the right path


const publicPath = path.join(__dirname, "../public/"); //path to folder of index.html
const viewsPath = path.join(__dirname, "../templates/views"); //path to views folder
const partialsPath = path.join(__dirname, "../templates/partials"); //path to partials folder
//// Dynamic serveups with handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath); //changing path and name of views
hbs.registerPartials(partialsPath);
// app.js serveups
app.get("", (request, response) => {
    response.render("index", {
        title: "weatherApp",
        name: "Fabian Lobnig"
    })
})
app.get("/about", (request, response) => {
    response.render("about", {
        title: "About Page",
        name: "Fabian Lobnig"
    })
})
app.get("/help", (request, response)=>{
    response.render("help", {
        title: "Help Page",
        helpMsg: "This is supposed to help you",
        name: "Fabian lobnig"
    })
})


//// Static serveup
app.use(express.static(publicPath))


app.get("/weather", (request, response)=>{
    if(!request.query.search) {
        const error = "Search term must be provided"
        return response.send({error});
    }

    getGeoCode(encodeURIComponent(request.query.search), (reject, latLon)=>{
        if(reject) return response.send(reject);

        getWeather(latLon, (reject, resolve)=>{
            if(reject) return response.send(reject);
            response.send(resolve) //change to .render
        })
    })


    // response.send({
    //     forecast: "placeholderForecast",
    //     location: "placeholderLocation",
    //     search: request.query.search
    // })
})
// app.get("/products", (request, response)=>{
//     if(!request.query.search) return response.send({
//         error: "Search term must be provided"
//     })

//     console.log(request.query)
//     response.send({
//         products: []
//     })
// })


app.get("/help/*", (request, response)=>{
    response.render("404", {
        title: "404 Page",
        errorMsg: "Help article not found",
        name: "Fabian lobnig"
    });
})
app.get("*", (request, response) => {
    response.render("404", {
        title: "404 Page",
        errorMsg: "Page not found",
        name: "Fabian lobnig"
    })
})



app.listen(port, ()=>{
    console.log("Server started on port "+port)
})
