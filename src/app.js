const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../template/views')
const partialpath = path.join(__dirname,'../template/partials')

//set up handlebars and views location
hbs.registerPartials(partialpath)
app.set('view engine','hbs')
app.set('views',viewspath)

//setting up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Christian Erkisen'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Christian Eriksen'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help',
        name:'Christian Eriksen'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Christian Eriksen',
        errorMessage:'Help article not found'

    })
})
app.get('/weather',(req,res)=>{
    const city  = req.query.address
    if(!city){
        return res.send({
            error:'You must provide an address'
        })
    }
    forecast(city,(error,forecastData,location)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastData,
            location,
            address:city
            
        })
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Christian Eriksen',
        errorMessage:'Page not found'
    })
})
app.listen(3000,()=>{
    console.log('Server started at port 3000')
})