const express = require('express')
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

app.use(morgan('dev')); // for logging purposes
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

const dishRouter = require('./routes/dishRouter');
app.use('/dishes', dishRouter);

const promoRouter = require('./routes/promoRouter');
app.use('/promotions', promoRouter);

const leaderRouter = require('./routes/leaderRouter');
app.use('/leaders', leaderRouter);

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});