// console.log("Menyalakan mesin kopi");
// console.log("Menggiling biji kopi");
// console.log("Memanaskan air");
// console.log("Mencampurkan air dan kopi");
// console.log("Menuangkan kopi ke dalam gelas");
// console.log("Menuangkan susu ke dalam gelas");
// console.log("Kopi Anda sudah siap!");

// const {coffeeStock, isCoffeeMachineReady} = require('./state');
// // console.log(coffeeStock);
// const makeCoffee = (type, miligrams) => {
//     if (coffeeStock[type] >= miligrams) {
//         console.log("Kopi berhasil dibuat!");
//     } else {
//         console.log("Biji kopi habis!");
//     }
// }
 
// makeCoffee("robusta", 150);
// console.log(isCoffeeMachineReady); 
/* output
Kopi berhasil dibuat!
*/

// import coffeeStock from './state.js';
 
// const displayStock = stock => {
//     for (const type in stock) {
//         console.log(type);
//     }
// }
 
// displayStock(coffeeStock);

import { coffeeStock as stock, isCoffeeMachineReady } from './state.js';
 
console.log(stock);
console.log(isCoffeeMachineReady);

console.log("Selamat datang!");
setTimeout(() => {
  console.log("Terima kasih sudah mampir, silakan datang kembali okay!");
}, 10000);
console.log("Ada yang bisa dibantu?");



