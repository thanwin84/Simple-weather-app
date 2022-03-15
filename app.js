const { response } = require('express');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});
app.post('/', (req, res)=>{
    // console.log(req.body.cityName);
    const q = req.body.cityName;
    const appKey = 'f64c49c7bd2298dbe8128fa26e3972a1';
    const unit = 'metric';
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +q+ "&appid="+appKey + "&units=" + unit;
    https.get(url, (response)=>{
        console.log(response.statusCode);
        // a chunk of data has been recieved
        response.on('data', (data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write(`<p>Current weather description is ${description}</p>`);
            res.write(`<h1>The current temparature in ${q} is ${temp} degrees celcius</h1>`);
            res.write(`<img src = ${iconUrl}>`);
            res.send();
        });
        
    });

    
});

app.listen(3000, function(){
    console.log("server is running");
});