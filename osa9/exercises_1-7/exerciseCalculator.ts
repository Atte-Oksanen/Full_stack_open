interface resultObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (trainingWeek: number[], target: number): resultObject | null => {
  let trainingDays = 0;
  let hoursTrained = 0;
  for (let i = 0; i < trainingWeek.length; i++) {
    if (isNaN(+trainingWeek[i])) {
      return null;
    }
    if (trainingWeek[i] !== 0) {
      trainingDays++;
      hoursTrained += trainingWeek[i];
    }
  }
  const rating = hoursTrained / (target * trainingWeek.length) < 0.3 ? 1 : hoursTrained / (target * trainingWeek.length) < 0.6 ? 2 : 3;
  const ratingDesc = rating === 1 ? 'you have to pick up the pace' : rating === 2 ? 'not too bad but could be better' : 'great job';
  return {
    periodLength: trainingWeek.length,
    trainingDays: trainingDays,
    success: rating === 3 ? true : false,
    rating: rating,
    ratingDescription: ratingDesc,
    target: target,
    average: hoursTrained / trainingWeek.length
  };
};
const inputWeek: number[] = [];
for (let i = 2; i < process.argv.length; i++) {
  inputWeek.push(Number(process.argv[i]));
}
console.log(calculateExercises(inputWeek, 5));

export default calculateExercises;