const request = require('request')
const weather = (city,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=3a3728983e3a82c07c84246f7af67f36&query=${city}&units=f`
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to weather service',undefined,undefined)
        }else if(body.error){
             callback('Unable to find location. Try another search',undefined,undefined)
        }
        else{
            console.log(body)
        callback(undefined,`${body.current.weather_descriptions}, It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%`,body.request.query
        )

        }
    })
}
``
module.exports = weather