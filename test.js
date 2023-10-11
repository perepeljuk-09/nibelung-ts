// const transformRow = (text) => {
//   return text
//     .split(" ")
//     .map((txt, index) =>
//       index === 0 ? txt.toLowerCase() : txt[0].toUpperCase() + txt.slice(1)
//     )
//     .join("");
// };

// console.log(transformRow("Я тебя Угрю"));

// const accaunts = [
//   [1, 2, 3],
//   [3, 2, 1, 4],
//   [5, 6],
// ];

// function maximumWealth(accaunts) {
//   let resultArr = [];

//   resultArr = accaunts.map((acc) => {
//     return acc.reduce((prev, current) => (prev += current), 0);
//   });

//   return Math.max(...resultArr);
// }
// function maximumWealth(accaunts) {
//   let accWealthNumber;
//   let accWealthSum;

//   accaunts.forEach((acc, index) => {
//     const sum = acc.reduce((prev, current) => (prev += current), 0);

//     if (!accWealthSum) {
//       accWealthNumber = index + 1;
//       accWealthSum = sum;
//       return;
//     }

//     if (sum > accWealthSum) {
//       accWealthNumber = index + 1;
//       accWealthSum = sum;
//     }
//   });

//   return `accNumber ${accWealthNumber}, sum - ${accWealthSum} `;
// }

// console.log(maximumWealth(accaunts));

// function narcissistic(value) {
//   // Code me to return true or false

//   const strValue = String(value);
//   const strLength = strValue.length;
//   let res = 0;

//   strValue.split("").forEach((num) => {
//     const numRes = Number(num) ** strLength;
//     res += numRes;
//   });

//   return res === value ? true : `${res} - ${value}`;

//   // console.log()
// }

// console.log(narcissistic(153));
// console.log(narcissistic(200));
// console.log(narcissistic(1652));

// const num = 153;
// const newNum = num.toString();
// console.log(num, newNum);

// function high(x) {
//   const alf = {
//     a: 1,
//     b: 2,
//     c: 3,
//     d: 4,
//     e: 5,
//     f: 6,
//     g: 7,
//     h: 8,
//     i: 9,
//     j: 10,
//     k: 11,
//     l: 12,
//     m: 13,
//     n: 14,
//     o: 15,
//     p: 16,
//     q: 17,
//     r: 18,
//     s: 19,
//     t: 20,
//     u: 21,
//     v: 22,
//     w: 23,
//     x: 24,
//     y: 25,
//     z: 26,
//   };

//   let resWord = "";
//   let res = 0;

//   x.split(" ").forEach((word) => {
//     let subRes = 0;
//     for (let i = 0; i < word.length; i++) {
//       subRes += alf[word[i]];
//     }

//     if (!res) {
//       res = subRes;
//       resWord = word;
//       return;
//     }

//     if (subRes > res) {
//       res = subRes;
//       resWord = word;
//     }
//   });

//   return resWord;
// }

// console.log(high("man i need a taxi up to ubud"), "taxi");
// console.log(high("what time are we climbing up the volcano"), "volcano");
// console.log(high("take me to semynak"), "semynak");
// console.log(high("aa b", "aa"));

// function countSmileys(arr) {
//   const exampleSmiles = [":)", ":D", ";-D", ":~)"];

//   let countSmiles = 0;

//   arr.forEach((element) => {
//     const check = exampleSmiles.some((value) => value === element);
//     console.log(check);
//     if (!check) return;
//     countSmiles++;
//   });

//   return countSmiles;
// }
// function countSmileys(arr) {
//   function checkEyes(char) {
//     return char === ":" || char === ";";
//   }
//   function checkNose(char) {
//     return char === "-" || char === "~";
//   }
//   function checkMouth(char) {
//     return char === ")" || char === "D";
//   }

//   let countSmiles = 0;
//   let newArr = [...arr];
//   let index = 0;

//   while (index < newArr.length) {
//     const word = newArr[index].split("");

//     for (let i = 0; i < word.length; i++) {
//       const char = word[i];
//       if (i === 0) {
//         if (checkEyes(char)) {
//           continue;
//         } else {
//           index += 1;
//           break;
//         }
//       } else if (i === 1) {
//         if (checkMouth(char)) {
//           countSmiles++;
//           index += 1;
//           break;
//         } else if (checkNose(char)) {
//           continue;
//         } else {
//           index += 1;
//           break;
//         }
//       } else if (i === 2) {
//         if (checkMouth(char)) {
//           countSmiles++;
//           index += 1;
//           break;
//         }
//       }
//     }
//   }

//   return countSmiles;
// }
// function countSmileys(arr) {
//   function checkEyes(char) {
//     return char === ":" || char === ";";
//   }
//   function checkNose(char) {
//     return char === "-" || char === "~";
//   }
//   function checkMouth(char) {
//     return char === ")" || char === "D";
//   }

//   let countSmiles = 0;
//   let newArr = [...arr];

//   newArr.forEach((word) => {
//     if (checkEyes(word[0]) && checkNose(word[1]) && checkMouth(word[2]))
//       countSmiles++;
//     else if (checkEyes(word[0]) && checkMouth(word[1])) countSmiles++;
//   });

//   return countSmiles;
// }

// console.log(countSmileys([":D", ":~)", ";~D", ":)"]));

// const a = "asd" === "asd" ? 'a' : "b";

console.log(this)