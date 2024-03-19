const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./src/Routes/userRoute.js');
const questionRoute = require('./src/Routes/questionRoute.js');
const answerRoute = require('./src/Routes/answerRoute.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// const authenticate = (req, res, next) => {
//     // authenticate user 
//     console.log('Authenticating');
//     next();
// }

// app.use(authenticate);


app.get('/', (req, res) => {
    res.send('Smart Question Answer API is running!');
});

app.use('/user', userRoute);
app.use('/question', questionRoute);
app.use('/answer', answerRoute);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});


module.exports = app;