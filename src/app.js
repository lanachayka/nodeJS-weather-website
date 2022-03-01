const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

//Define path for Exress config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ruslana Pidsadiuk'
    });
});

// app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ruslana Pidsadiuk'
    });
});

// app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ruslana Pidsadiuk',
        helpText: 'This is some helpful text'
    });
});

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address term'
        });
    };
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast(latitude, longitude, (error, { weatherDescription, temperature, feelslike }) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            return res.send({
                location: location,
                weatherDescription: weatherDescription,
                temperature: temperature,
                feelslike: feelslike
            });
        });
    });
});

// error handing
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ruslana Pidsadiuk',
        errorMesaage: 'Help article not found'
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ruslana Pidsadiuk',
        errorMesaage: 'Page not found'
    });
});

//Start server
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});