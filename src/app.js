const express = require('express')
const app = express()
const port = 3000

// app.get('/',(req,res)=>{

// res.send('hello worlddddddddddddd!')

// })
///////// help page 
app.get('/help',(req,res)=>{

    res.send('This is help page')
    
    });

    ///////////// weather page 
    // app.get('/weather',(req,res)=>{

    //     res.send({
    //         Location : "egypt",
    //         Forecast:"Cold"
    //     })
        
    //     })

//////// about page in HTML
    app.get('/about',(req,res)=>{

        res.send('<h1>Hello this is about page in HTML</h1>')
        
        })
        //////////// public files 

        const path = require ('path')
        const publicDirectory = path.join(__dirname,'../public')
        console.log(publicDirectory)
        app.use(express.static(publicDirectory))

        /////////////// hbs files
        app.set('view engine','hbs')
        /////
        const viewPath= path.join(__dirname,'../templates/views')
        app.set('views',viewPath)

        /////////////// partials for footer and header

        const hbs = require('hbs');
const { response } = require('express');

        const partialpath=path.join(__dirname,'../templates/partials')

        hbs.registerPartials(partialpath)


        
//// test hbs file --1 
            app.get('/',(req,res)=>{
                res.render('index',{
                    title:"title for test page ",
                    name : "name of test hbs"
                })
            })
        

        //////// help hbs file --2 
        app.get('/help2',(req,res)=>{
            res.render('help',{
                title:"title for help hbs  ",
                name : "name for help hbs",
                message : "message for help hbs"

            })
        })
        /////////////
        // URL : localhost:3000/weather?address=egypt
        // app.get('/weather',(req,res)=>{
        //     console.log(req.query);
        //     console.log(req.query.address)
        //     if(req.query.address===''){
        //         console.log("There is no location")
        //     }
        //     else {
        //     res.send({
        //         Location : req.query.address,
        //         Forecast:"Cold"
        //     })
        // }
        // })
        //////////////////////////////
        ///study training
        ///--------------
//         app.get('/geocode',(req,res)=>{
//             if(!req.query.rating){
// return res.send({error:"you dont put the rating"})
//             }
//             {res.send({ok:"ok"})}
//         })

        /////////////////////
        // npm i request 

        const geocode = require('./tools/geocode');
        const forecast = require('./tools/forecast');

        app.get('/weather',(req,res)=>{
            if(!req.query.address){
                return res.send({
                    error:"you must provide address"
                })
            }
            geocode(req.query.address,(error,data)=>{
                if (error){
                    return res.send({error:error})
                }
                forecast(data.latitude,data.longtitude,(error,forecastData)=>{
                    if(error){
                        console.log(error)
                        return res.send({error:error})
                    }
                    res.send({
                        location:req.query.address,
                        forecast:forecastData
                    })
                })
            })
        })






        


        app.get('*',(req,res)=>{
            res.render('error')
        })

app.listen(port,()=>{
console.log('server is running')

})