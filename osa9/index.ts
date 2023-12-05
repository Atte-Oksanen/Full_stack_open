import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const bmi = calculateBmi(Number(req.query.height), Number(req.query.weight));
  if (bmi === null) {
    return res.json({ error: 'malformatted input' });
  }
  return res.json({ ...req.query, bmi: bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target = req.body.target;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const exercises = req.body.daily_exercises;
  if (exercises === undefined || target === undefined) {
    res.json({ error: 'parameters missing' });
  }
  const returnObject = calculateExercises(exercises as number[], Number(target));
  if (returnObject === null) {
    res.json({ error: 'malformatted parameters' });
  }
  res.json(returnObject);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});