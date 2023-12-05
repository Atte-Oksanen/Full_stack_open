const calculateBmi = (height: number, weight: number): string | null => {
  if (isNaN(weight) || isNaN(height)) {
    return null;
  }
  const bmi = Math.round(((weight / Math.pow(height, 2)) * 100000)) / 10;
  if (bmi < 18.5) {
    return 'Underweight';
  }
  if (bmi < 24.9) {
    return 'Normal (healthy weight)';
  }
  if (bmi < 29.9) {
    return 'Overweight';
  }
  return 'Obese';
};

console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));

export default calculateBmi;