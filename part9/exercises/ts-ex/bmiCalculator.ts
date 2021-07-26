const calculateBmi = (heightCm: number, weightKg: number): number => {
    return weightKg / Math.pow(heightCm / 100, 2)
}

console.log(calculateBmi(180, 74))
