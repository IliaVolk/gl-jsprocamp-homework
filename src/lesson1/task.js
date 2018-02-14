/*
  Напишите функцию, которая принимает 1 аргумент и возварщает его тип
*/
function getDataType(variable) {
    return typeof variable;
}


export const DataType = {
    primitive: 'primitive',
    primitiveSpecial: 'primitive-special',
    objectArray: 'object-array',
    objectFunction: 'object-function',
    object: 'object',
};
/*
  Напишите функцию, которая принимает 1 аргумент и возвращает:
  'primitive' если тип данных относится к примивным
  'primitive-special' если тип данных специальный
  'object' - если простой обьект
  'object-array' - если массив
  'object-function' - если функция
*/
function getDataTypePseudoName(variable) {
    const type = typeof variable;
    if (['boolean', 'number', 'string'].includes(type)) {
        return DataType.primitive;
    }
    if ([null, undefined].includes(variable)) {
        return DataType.primitiveSpecial;
    }
    if (Array.isArray(variable)) {
        return DataType.objectArray;
    }
    if (type === 'function') {
        return DataType.objectFunction;
    }
    if (type === 'object') {
        return DataType.object;
    }
}


/*
  Напишите функцию, которая принимает 2 аргумента,
  и возврвщает 1 если их значения и их типы равны,
  0 если равны только значения
  и -1 в другом случае
*/
function compareByType(a, b) {
    if (a === b) {
        return 1;
    }
    if (a == b) {
        return 0;
    }
    return -1;
}

// Numbers

/*
  Напишите функцию, которая принимает 1 аргумент,
  и в случае если аргумент имеет числовой тип увеличивает его на 1
  и возврвщвет результат,
  в любом другом случае возврвщвет -1
*/
function increase(value) {
    if (typeof value === 'number' && !Number.isNaN(value)) {
        return value + 1;
    }
    return -1;
}

/*
  Напишите функцию, которая принимает 1 аргумент(число),
  и в случае если аргумент не Infinity или NaN возвращает строку 'safe' иначе 'danger'
*/
function testForSafeNumber(value) {
    if (Number.isNaN(value) || !Number.isFinite(value)) {
        return 'danger';
    }
    return 'safe';
}


// Strings

/*
  Напишите функцию, которая принимает 1 аргумент (строку),
  и возвращает массив из елементов строки разделенных по пробелу ' '
*/
function stringToArray(str) {
    return str.split(' ');
}


/*
  Напишите функцию, которая принимает 1 аргумент (строку),
  и возвращает часть этой строки до первой запятой
*/
function getStringPart(str) {
    return str.split(',')[0];
}

/*
  Напишите функцию, которая принимает 2 аргумента (строку и симовл),
  и возвращает порядковый номер симовола в строе если символ встречается в строке 1 раз,
  false в противоположном случае
*/
function isSingleSymbolMatch(str, symbol) {
    const index = str.indexOf(symbol);
    if (index !== -1) {
        if (str.indexOf(symbol, index + 1) === -1) {
            return index;
        }
    }
    return false;
}

/*
  Напишите функцию, которая принимает 2 аргумента,
  массив в разделитель[опционально],
  и возвращает строку ввиде элементов массива c разделителями если разделитель задан
  или строку разделенную "-" если не задан
*/
function join(array, separator) {
    return array.join(separator || '-');
}


/*
  Напишите функцию, которая принимает 2 массива,
  и возвращает один состоящий из элементов перового и второго (последовательно сначала первый потом второй)
*/
function glue(arrA, arrB) {
    return [...arrA, ...arrB];
}


/*
  Напишите функцию, которая принимает 1 массив,
  и возвращает другой массив отсортированный от большего к меньшему
*/
function order(arr) {
    return arr.sort().reverse();
}


/*
  Напишите функцию, которая принимает 1 массив,
  и возвращает другой без чисел которые меньше 0
*/
function removeNegative(arr) {
    return arr.filter(number => number >= 0);
}

/*
  Напишите функцию, которая принимает 2 числовых массива,
  и возвращает новый массив, состоящий из элементов первого но без элементов
  которые присутствуют во втром
  [1,2,3], [1, 3] => [2]
*/
function without(arrA, arrB) {
    return arrA.filter(number => !arrB.includes(number));
}

/*
  Напишите функцию, которая принимает строку,
  содержащую выражение математической операции с двумя
  операндами (поддерживаются 4 базовых оператора + - / *).
  Функция вычисляет выражение и возвращает число либо NaN.
  '12/6' => 2
*/
function calcExpression(expression) {
    const [str, _first, operator, _second] = /(.+?)([*\-+/]){1}(.+)/.exec(expression.replace(new RegExp(' ', 'g'), ''));
    const [first, second] = [+_first, +_second];
    switch (operator) { // eslint-disable-line default-case
        // to get more coverage
        case '*':
            return first * second;
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '/':
            return first / second;
    }
}

/*
  Напишите функцию, которая принимает строку,
  содержащую выражение логической операции с двумя
  операндами (поддерживаются 5 базовых операторов > < = >= <=).
  Функция вычисляет выражение и возвращает true / false,
  либо бросает exception в случае ошибки.
  '100>5' => true
*/
function calcComparison(expression) {
    const [str, _first, operator, _second] = /(.+?)(>=|<=|>|<|=)(.+)/.exec(expression.replace(new RegExp(' ', 'g'), ''));
    const [first, second] = [+_first, +_second];
    if ([first, second].includes(NaN)) {
        throw new Error('Can not compare');
    }
    switch (operator) { // eslint-disable-line default-case
        // to get more coverage
        case '=':
            return first === second;
        case '>':
            return first > second;
        case '<':
            return first < second;
        case '>=':
            return first >= second;
        case '<=':
            return first <= second;
    }
}

/*
  Напишите функцию, которая принимает обьект и строку,
  содержащую выражение доступа к свойствам обьекта.
  Функция возвращает значение запрашиваемого свойства либо
  бросает exception в случае ошибки.
  { a: { x: 2 }, b: 5 }, '.a.x' => 2
  { a: 1, b: 2 }, '.c' => exception
*/
function evalKey(obj, expression) {
    if (!expression) throw new Error();
    const [str, key, rest] = /.(.+?)(.*)/.exec(expression.replace(new RegExp(' ', 'g'), ''));
    console.log(obj, expression, key, rest);
    if (key in obj) {
        const value = obj[key];
        if (rest) {
            return evalKey(value, rest);
        }
        return value;
    }
}

export default {
    getDataType,
    getDataTypePseudoName,
    compareByType,
    increase,
    testForSafeNumber,
    stringToArray,
    getStringPart,
    isSingleSymbolMatch,
    join,
    glue,
    order,
    removeNegative,
    without,
    calcExpression,
    calcComparison,
    evalKey,
};
