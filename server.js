const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./Routes/userRoute.js');
const questionRoute = require('./Routes/questionRoute.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// const authenticate = (req, res, next) => {
//     // authenticate user 
//     console.log('Authenticating');
//     next();
// }

// app.use(authenticate);


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/user', userRoute);
app.use('/question', questionRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
