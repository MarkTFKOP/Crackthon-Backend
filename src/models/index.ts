import category from "./category";
import auth from "./auth";
import restaurants from "./restaurants";
import foods from "./foods";
import Clothes from "./Clothes";
// let test;
// Object.entries(mongooseObject).forEach((_, ind) => {
//   test = _[0];
//   mongoose.model(test, _[1]);

//   Object.defineProperties(mongooseObject, {
//     category: { value: mongoose.model(_[0], _[1]), writable: false },
//   });
// });

export default {
  category: category,
  auth: auth,
  restaurants: restaurants,
  foods: foods,
  Clothes: Clothes,
};
