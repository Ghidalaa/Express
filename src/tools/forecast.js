const request = require('request')
const forecast = (latitude,longitude,callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=e818390445c98dfad0da1c00a33ad9f8&query=" + latitude + ',' + longitude;
     request({ url ,json:true}, (error, response) => {
    // console.log(response.body)

    // internet connection / invalid url
    if(error){
     callback('Unable to connect to weather service',undefined)
    }

    else if(response.body.error){
       callback('Unable to find location',undefined)
    }
    else{
       callback(undefined,response.body.current.weather_descriptions[0] + ' It is now ' + response.body.current.temperature)
    }
 });
}

module.exports = forecast