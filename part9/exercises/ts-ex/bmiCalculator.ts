const calculateBmi = (heightCm: number, weightKg: number): number => {
    return weightKg / Math.pow(heightCm / 100, 2);
};

module.exports = {calculateBmi};