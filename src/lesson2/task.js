
const assertNumbers = (...args) => {
    const notNumbers = args.filter(arg => typeof arg !== 'number');
    if (notNumbers.length) {
        throw new Error(`All arguments should be numbers, but ${notNumbers} were not`);
    }
};

/*
 Напишите функцию, которая параметрами принимает 2 числа и возвращает их сумму
 */
export function sum(a, b) {
    assertNumbers(a, b);
    return a + b;
}

/*
 Напишите функцию, которая возвращает сумму всех чисел, что передаются параметрами
 */
export function sumAll(initial, ...args) {
    assertNumbers(initial, ...args);
    return args.reduce((a, b) => a + b, initial);
}

/*
 Напишите функцию, которая возвращает число x в степень n
 */
export function pow(x, n) {
    assertNumbers(x, n);
    return x ** n;
}

/*
 Напишите функцию, которая возвращает рандомное целое число от from до to
 */
export function random(from, to) {
    assertNumbers(from, to);
    return (Math.random() * (to - from)) + from;
}

export default {
    sum,
    sumAll,
    pow,
    random,
};
