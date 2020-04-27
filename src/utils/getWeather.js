// import request from "request";
const request = require("request");

const getWeather = (latLon, callback)=>{
    let unit = "&units=m" //language
    const url = `http://api.weatherstack.com/current?access_key=16eaaa66782d1d1332266bdd15b0776f&query=${latLon}${unit}`;
    request({url, json:true}, (e, {body}={})=>{
        try{
            const {weather_descriptions, temperature, precip} = body.current;
            const {country, name:locationName, localtime} = body.location;
            const error = "Unable to find location, please try again";
            if(!weather_descriptions[0]&& !country) callback({error}, undefined)
            else {
                const response = `It´s ${weather_descriptions[0]} in ${locationName} ${country} at around ${temperature} and the chance of rain is ${precip}. This was measured at ${localtime}`
                callback(undefined, {response});
            }
        } 
        catch(error){
            callback(e, undefined);
        }
    })
}

export {getWeather};