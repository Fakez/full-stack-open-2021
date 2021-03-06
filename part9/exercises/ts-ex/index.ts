import express from 'express';
const {calculateBmi} = require('./bmiCalculator')
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight:number = Number(req.query.weight);
    const height:number = Number(req.query.height);

    if (!weight || !height) res.json({error: "malformatted parameters"});
    const response = {
        weight: weight,
        height: height,
        bmi: calculateBmi(weight, height)
    }
    res.json(response);
});

app.post('/calculate', (req, res) => {
    const { weight, height } = req.body;
  
    const result = calculateBmi(weight, height);
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});