let values: (number | string)[] = [10, "hello", 20, "world"];

let sum = values.reduce((acc, val) => acc + Number(val), 0);

console.log(sum);
