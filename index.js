let testData = [1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false];
let testData2 = [1, 2, 1990, 85, 24, 5, 7, 8.1];
let testData3 = [{"name":"Vasya","email":"vasya@example.com","age":20,"skills":{"php":0,"js":-1,"madness":10,"rage":10}},{"name":"Dima","email":"dima@example.com","age":34,"skills":{"php":5,"js":7,"madness":3,"rage":2}},{"name":"Colya","email":"colya@example.com","age":46,"skills":{"php":8,"js":-2,"madness":1,"rage":4}},{"name":"Misha","email":"misha@example.com","age":16,"skills":{"php":6,"js":6,"madness":5,"rage":2}},{"name":"Ashan","email":"ashan@example.com","age":99,"skills":{"php":0,"js":10,"madness":10,"rage":1}},{"name":"Rafshan","email":"rafshan@example.com","age":11,"skills":{"php":0,"js":0,"madness":0,"rage":10}}]
let testData4 = [{"name":"Vasya","email":"vasya@example.com","age":20},{"name":"Dima","email":"dima@example.com","age":34},{"name":"Colya","email":"colya@example.com","age":46},{"name":"Misha","email":"misha@example.com","age":16},{"name":"Ashan","email":"ashan@example.com","age":99},{"name":"Rafshan","email":"rafshan@example.com","age":11},1,2,1990,85,24,"Vasya","colya@example.com","Rafshan","ashan@example.com",true,false,[[[[1,2,1990,85,24,"Vasya","colya@example.com","Rafshan","ashan@example.com",true,false,[{"name":"Rafshan","email":"rafshan@example.com","age":11}]]]]]]

//================1========================================
// Напишите функцию cloneDeep таким образом, 
// чтобы она была способна клонировать переданный как параметр объект.

const cloneDeep = (obj) => {
  const result = {};

  const arrayClone = (arr) =>
    arr.map((item) => {
      if (typeof item !== "object") {
        return item;
      } else {
        return Array.isArray(item) ? arrayClone(item) : cloneDeep(item);
      }
    });

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      result[key] = Array.isArray(value) ? arrayClone(value) : cloneDeep(value);
      continue;
    }
    result[key] = value;
  }

  return result;
};

// const initialObj = { a: 1, b: [4, 3, 2], c: { d: 1, e: { f: 5, g: 6, h: 0 } } };
// const result = cloneDeep(initialObj);
// console.log("result>>>>>", result);
// console.log(initialObj.b === result.b); //false
// console.log(initialObj.c === result.c); //false
// console.log(initialObj.c.e === result.c.e); //false



//================2=======================================
// Свертка. Используйте метод reduce в комбинации с concat для свёртки 
// массива массивов в один массив, у которого есть все элементы входных массивов.

const oneLevelFlat = (arr) =>
  arr.reduce((result, value) => result.concat(value), []);

// const arrays = [[1, 2, 3], [4, 5], [6]];
// console.log(oneLevelFlat(arrays)); //[1, 2, 3, 4, 5, 6]



//================3========================================
/*Допустим, у вас есть функция primitiveMultiply, которая в 50% случаев перемножает 2 числа, 
а в остальных случаях выбрасывает исключение типа MultiplicatorUnitFailure. 
Напишите функцию, обёртывающую эту, и просто вызывающую её до тех пор, 
пока не будет получен успешный результат.*/

function MultiplicatorUnitFailure() {}
function primitiveMultiply(a, b) {
  if (Math.random() < 0.5) return a * b;
  else throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
  while (true) {
    try {
      return primitiveMultiply(a, b);
    } catch (error) {
      continue;
    }
  }
}

// console.log(reliableMultiply(5, 6));



//================4========================================
// Расширить прототип Array, добавив к нему метод добавления элемента в начало без использование unshift.

Array.prototype.append = function (...items) {
  for (let i = this.length - 1; i >= 0; i--) {
    this[i + items.length] = this[i];
  }
  for (let i = 0; i < items.length; i++) {
    this[i] = items[i];
  }
  return this.length;
};

// const initialArr = [1, 2, 3, 4, 5];
// initialArr.append(-2, -1, 0);
// console.log(initialArr); //[-2, -1, 0, 1, 2, 3, 4, 5]



//================5========================================
// Выведите все элементы массива используя рекурсию.

function recurseLog(arr, itemIndex = 0) {
  console.log(arr[itemIndex]);
  if (itemIndex < arr.length - 1) {
    recurseLog(arr, ++itemIndex);
  }
}

// var arr = ["Solnce", "vishlo", "iz", "za", "tuchi"];
// recurseLog(arr);



//================6========================================
// Написать функцию для выполнения параллельных вычислений без использования Promise.

const paralell = (funcWithArgArr, resultFunc) => {
  const results = [];

  funcWithArgArr.forEach(([func, args = []]) => {
    setTimeout(() => results.push(func(...args)), 0);
  });
  setTimeout(resultFunc, 0, results);
};

// const a = function (one, two) {
//   return one + two;
// };
// const b = function () {
//   return false;
// };
// paralell([[a, [1, 2]], [b]], function (results) {
//   console.log(results); // [3, false]
// });



//================7========================================
// Сделать функцию поиска значений в массиве.

const arrayFind = (arr, search) => {
  const resultArr = [];
  if (search instanceof RegExp) {
    arr.forEach(
      (value, index) =>
        String(value).search(search) !== -1 && resultArr.push(index)
    );
  } else {
    arr.forEach((value, index) => value === search && resultArr.push(index));
  }
  switch (resultArr.length) {
    case 0:
      return null;
    case 1:
      return arr[resultArr[0]];
    default:
      return resultArr;
  }
};

// console.log(arrayFind(testData, /^raf.*/i)); //["Rafshan"]
// console.log(arrayFind(testData, "Rafshan"));// ["Rafshan"]
// console.log(arrayFind(testData, /^\S*@example.*$/));// [6, 8]
// console.log(arrayFind(testData, 'home'));// null



//================8========================================
// Сделать функцию которая обрезает массив до указанного значения.

const arraySkipUntil = (arr, value) => {
  const valueIndex = arr.indexOf(value);
  return valueIndex === -1 ? [] : arr.slice(valueIndex);
};

// console.log(arraySkipUntil(testData, 2)); // [2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false]
// console.log(arraySkipUntil(testData, "Rafshan")); // ["Rafshan", "ashan@example.com", true, false]
// console.log(arraySkipUntil(testData, "asd")); // []



//================9========================================
// Создать функцию которая нормализует данные в массиве исключая или преобразуя не подходящие.

const templates = {
  string: {
    check: (value) => typeof value === "string",
    typesForChange: ["number"],
    transformFunc: (value) => String(value),
  },
  number: {
    check: (value) => typeof value === "number",
    typesForChange: ["string"],
    transformFunc: (value) => (isNan(Number(value)) ? null : Number(value)),
  },
  int: {
    check: (value) => Number.isInteger(value),
    typesForChange: ["number"],
    transformFunc: (value) => parseInt(value, 10),
  },
  float: {
    check: (value) => typeof value === "number" && !Number.isInteger(value),
    typesForChange: ["number"],
    transformFunc: (value) => parseFloat(value),
  },
  bool: {
    check: (value) => typeof value === "boolean",
    typesForChange: ["all"],
    transformFunc: (value) => Boolean(value),
  },
  function: {
    check: (value) => typeof value === "function",
    typesForChange: [],
    transformFunc: () => {},
  },
  array: {
    check: (value) => Array.isArray(value),
    typesForChange: [],
    transformFunc: () => {},
  },
  object: {
    check: (value) => typeof value === "object",
    typesForChange: ["string"],
    transformFunc: (value) => ({ name: value }),
  },
};

const arrayNormalize = (arr, schema, transform = false) => {
  if (transform) {
    return typeof schema === "object"
      ? arr
          .filter((item) => templates.object.check(item))
          .map((item) => {
            const finalObj = {};
            for (const [key, value] of Object.entries(schema)) {
              if (templates[value].check(item[key])) {
                finalObj[key] = templates[value].transformFunc(item[key]);
                continue;
              }
              return null;
            }
            return finalObj;
          })
          .filter((item) => Boolean(item))
      : [...arr]
          .map((item) => {
            if (templates[schema].check(item)) {
              return item;
            } else if (templates[schema].typesForChange.includes(typeof item)) {
              return templates[schema].transformFunc(item);
            }
          })
          .filter((item) => typeof item !== "undefined");
  } else {
    return typeof schema === "object"
      ? arr
          .filter((item) => templates.object.check(item))
          .map((item) => {
            const finalObj = {};
            for (const [key, value] of Object.entries(schema)) {
              if (templates[value].check(item[key])) {
                finalObj[key] = item[key];
                continue;
              }
              return null;
            }
            return finalObj;
          })
          .filter((item) => Boolean(item))
      : [...arr].filter((item) => templates[schema].check(item));
  }
};

// console.log(arrayNormalize(testData4, "string")); // ["Vasya", "colya@example.com", "Rafshan", "ashan@example.com"]
// console.log(arrayNormalize(testData4, { age: "float" })); //[]
// console.log(arrayNormalize(testData4, { age: "int" })); // [{age: 20}, {age: 34}, {age: 46}, {age: 16}, {age: 99}, {age: 11}]
// console.log(arrayNormalize(testData4, { age: "int", name: "string" })); // [{age: 20,  name: "Vasya"}, {age: 34, name: "Dima"}, {age: 46, name: "Colya"}, {age: 16, name: "Misha"}, {age: 99,  name: "Ashan"}, {age: 11,  name: "Rafshan"}]
// console.log(arrayNormalize(testData4, "string", true)); // ["1", "2", "1990", "85", "24", "Vasya", "colya@example.com", "Rafshan", "ashan@example.com"]
// console.log(arrayNormalize(testData4, { age: "int" }, true)); //[{age: 20}, {age: 34}, {age: 46}, {age: 16}, {age: 99}, {age: 11}]



//================10========================================
// Сделать функцию которая возвращает уникальные элементы массива.
const arrayUnique = (arr) => [...new Set(arr)];

// console.log(arrayUnique(testData.concat(testData2))); //[1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false, 5, 7, 8.1]



//================11========================================
// Сделать функцию которая сможет делать срез данных с ассоциативного массива.
/**
 * 
 * @param {<Object>} arr 
 * @param {string} path 
 * @returns arr <any>
 */
const arrayPluck = (arr, path) =>
  arr
    .map((item) => path.split(".").reduce((result, key) => result?.[key], item))
    .filter((item) => typeof item !== "undefined");

// console.log(arrayPluck(testData3, "skills.php")); //[0, 5, 8, 6, 0, 0]



//================12========================================
// Создать функцию которая создает объект на основании двух представленных массивов 
// используя один как ключи, а другой как значения. Не подходящие ключи массивов должны быть исключены.

const arrayCombine = (keys, values) => {
  const resultObj = {};
  const appropriateKeys = keys.filter(
    (key) => typeof key === "string" || typeof key === "number"
  );
  for (let i = 0; i < appropriateKeys.length; i++) {
    resultObj[appropriateKeys[i]] = values[i];
  }
  return resultObj;
};

// console.log(arrayCombine(testData, testData2)); //{1: 1, 2: 2, 24: 24, 85: 85, 1990: 1990, Vasya: 5, colya@example.com: 7, Rafshan: 8.1, ashan@example.com: undefined}
