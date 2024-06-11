const addition = (numbers) => {
  // Error handling for invalid input
  if (!Array.isArray(numbers) || !numbers.length) {
    throw new Error("Invalid input: 'numbers' must be a non-empty array");
  }

  // Efficiently calculate sum using reduce
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum;
};

const subtraction = (numbers) => {
  // Error handling for invalid input
  if (!Array.isArray(numbers) || !numbers.length) {
    throw new Error("Invalid input: 'numbers' must be a non-empty array");
  }

  // Starting accumulator set to the first element (assuming subtraction from the first)
  const startingAcc = numbers[0];

  // Calculate difference using reduce on remaining elements
  const difference = numbers.slice(1).reduce((acc, curr) => acc - curr, startingAcc);
  return difference;
};

module.exports = { addition, subtraction };
