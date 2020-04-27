// import request from "request";
const request = require("request");


const getGeoCode = (location, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibWFwYm94YXBpbm9kZWpzIiwiYSI6ImNrOThtZWFoczAzbHAzZXA0a2JjMHk1MmIifQ.j0dg17csr-wyyZJ2vfXV3A`
    request({url, json: true}, (e, {body}={})=>{
        try{ 
            if(body.features[0]){
                const {center:latLon} = body.features[0];
                callback(undefined, latLon[1]+","+latLon[0]);
            }
            else {
                const error = "Invalid location name"
                callback({error}, undefined);
            }
        } 
        catch(error){
            callback(e, undefined);
        }
    })
}

// export {getGeoCode};
module.exports = getGeoCode;