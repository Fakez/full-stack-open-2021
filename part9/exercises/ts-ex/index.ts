import express from 'express';
const {calculateBmi} = require('./bmiCalculator')
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
    const weight = req.query.weight
    const height = req.query.height

    const response = {
        weight: weight,
        height: height,
        bmi: calculateBmi(weight, height)
    }
    res.json(response)
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});