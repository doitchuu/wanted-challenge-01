import { IProduct } from "../../types/MockData";

function Card({ product }: { product: IProduct }) {
  return (
    <div className="flex flex-col p-8 mb-4 rounded-2xl bg-white">
      <div className="pb-6 border-b-2 border-solid border-slate-200">
        <h3 className="text-xl font-medium text-zinc-800">{product.productName}</h3>
        <p className="text-zinc-500">{product.boughtDate}</p>
      </div>
      <p className="pt-3 text-xl font-bold">$ {product.price}</p>
    </div>
  );
}

export default Card;
