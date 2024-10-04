import { IProduct } from "../types/MockData";

function calculateAllPrices(products: IProduct[]) {
  let sum = 0;

  for (let i = 0; i < products.length; i++) {
    sum += Number(products[i].price);
  }

  return sum;
}

export default calculateAllPrices;
