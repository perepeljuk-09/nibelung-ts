// // const arr = [0, 8, 9, 40, 41, 66, 67, 11, 18, 17, 22, 91, 1];

// let count = 0;

// // function linearFn(array, item) {
// //   for (let i = 0; i < array.length; i++) {
// //     count += 1;

// //     if (array[i] === item) {
// //       return i;
// //     }
// //   }

// //   return null;
// // }

// // console.log(linearFn(arr, 8));
// // console.log("count >>>", count);

// // function binearFn (array, item) {

// //   count += 1;

// //   const centerValue = array.lenght / 2

// //   if(centerValue > item) {

// //   } else if (centerValue === item) {
// //     return

// //   }

// // }

// const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// function binearFn(array, item) {
//   let start = 0;
//   let end = array.length;
//   let middle;
//   let position = -1;
//   let found = false;

//   while (found === false && start <= end) {
//     count += 1;
//     middle = Math.floor((start + end) / 2);

//     if (array[middle] === item) {
//       found = true;
//       position = middle;
//       return position;
//     }
//     if (item < array[middle]) {
//       end = middle - 1;
//     } else {
//       start = middle + 1;
//     }
//   }

//   return position;
// }

// console.log(binearFn(arr, 0));
// console.log("count >>>", count);

// const ScriptFarmInterval = (variant) => {

//   // search input by variant
//   const input = document.querySelector(`input[name="light[${variant === "a" ? "814" : "815"}]"` )

//   if(!input) {
//     alert("input не найден")
//     return
//   }

//   // get value from input
//   const inputValue = Number(input.value);

//   // className for search btns
//   const className = `farm_icon_${variant}`

//   // search btns
//   const btns = document.getElementsByClassName(className);

//   // find field with count lights
//   const lights = document.getElementsByClassName("unit-item-light");

//   // count Lights to number
//   let countLights = Number(lights[0].innerText);

//   // interval code

//   let i = 1;
//   const interval = setInterval(() => {
//     if (countLights < inputValue || btns.length === i) {
//       alert("Интервал закончился");
//       clearInterval(interval);
//     } else {
//       btns[i].click();
//       i++;
//       countLights = countLights - inputValue;
//     }
//   }, 500);
// };

// ScriptFarmInterval("b");

// const maps = new Map();

// const objKey = { id: 1 };

// maps.set("name", "halfGod");
// maps.set(objKey, "halfGod_ 2");

// console.log(maps.get("name"));
// console.log(maps.get(objKey));

// const sets = new Set();

// sets.add(1);
// sets.add(1);
// sets.add(2);
// sets.add(2);
// sets.add(1);
// sets.add(3);
// sets.add(3);

// console.log("sets >>", sets);

// function fn() {
//   return this;
// }

// const obj = { name: "Shurik" };

// const newFn = fn.bind(obj);
// console.log(newFn());

// function getDublicates(text: string) {
//   const alf: { [index: string]: boolean } = {};

//   text
//     .toLowerCase()
//     .split("")
//     .forEach((char) => {
//       if (alf[char] === false) {
//         alf[char] = true;
//       } else {
//         alf[char] = false;
//       }
//     });

//   console.log(Object.values(alf).filter((value) => value));

//   return console.log(Object.values(alf).filter((value) => value).length);
// }

// getDublicates("Dadasssdggdklxj");
// getDublicates("asdfgh");
// getDublicates("aasdff");
// getDublicates("assddf");
// getDublicates("asdlkjhfg");
// getDublicates("llkkssddssss");

// const user = {
//   name: "Ilya",
//   age: 24,
//   // getName: () => {
//   //   return `${this.name} - ${this.age}`;
//   // },
// };

// function getAge() {
//   return `${this.age}`;
// }

// const getAgeBound = getAge.bind(user);
// // const getNameBound = user.getName.bind(user);

// // console.log(user.getName());
// console.log(getAgeBound());
// // console.log(getNameBound());

let row = "Sasha";

row = row.replace(row[0], row[0].toLowerCase());

console.log(row);
