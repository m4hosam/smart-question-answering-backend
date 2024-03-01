import express from 'express'
import { PrismaClient } from '@prisma/client'
import bodyParser from 'body-parser';

const app = express();

const prisma = new PrismaClient()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/user', async (req, res) => {
    // Create a new user from req.body using prisma client
    console.log("req.body", req.body)
    const { name, email, password } = req.body
    console.log("name, email, password", name, email, password)
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
        }
    })
    res.json(user)
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
