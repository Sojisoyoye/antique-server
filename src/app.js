import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    return res.status(200).send({ 'message': 'Welcome to Antique™ World 🌍' });
});

app.all('*', (req, res) => res.status(404).send({
    status: 'error',
    message: 'This route does not exist'
}));
  
app.listen(3000)
console.log('app running on port ', 3000);

