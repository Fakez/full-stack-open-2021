// const multiplicator = (a: number, b: number, printText: string) => {
//   console.log(printText,  a * b);
// }
  
// multiplicator(2, 4, 'Multiplied a string and 4, the result is:');

//*********************** */

// type Operation = 'multiply' | 'add' | 'divide';
// type Result = string | number | undefined

// const calculator = (a: number, b: number, op: Operation): Result => {

//   if (op === 'multiply') {
//     return a * b;
//   } else if (op === 'add') {
//     return a + b;
//   } else if (op === 'divide') {
//     if (b === 0) return 'this cannot be done';
//     return a / b;
//   }
// }

// console.log(calculator(2, 2, 'multiply'))

//*********************** */

interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText,  a * b);
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}