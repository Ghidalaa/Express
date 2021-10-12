const request = require('request')
const geocode = (address,callback) =>{
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiZmFyYWgxMjMiLCJhIjoiY2tpb3ZrNnE4MDB0cjJ0cDlzZXZ5eHQ5dSJ9.F6mgRF14yRJ6WN9JqtpWtw'

    request({url:geocodeUrl,json:true},(error,response)=>{
    if(error){
        callback('Unable to connect to location service',undefined)
    }
    else if(response.body.message){
        callback('Unable to find location, try again',undefined)
    }
    else if(response.body.features.length == 0){
        callback('Unable to find location, try again',undefined)
    }
    else{
       callback(undefined,{
         longtitude: response.body.features[0].center[0],
         latitude :response.body.features[0].center[1]
       })
    }
})
}

module.exports = geocode