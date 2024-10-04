import { useState, useEffect } from "react";

import Card from "./components/Card";

import useIntersect from "./hooks/useIntersect";
import calculateAllPrices from "./utils/calculateAllPrices";
import getMockData from "./utils/getMockData";
import { IProduct } from "./types/MockData";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [allPrices, setAllPrices] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProducts(page: number) {
      const { datas, isEnd } = await getMockData(page);
      const sum = calculateAllPrices(datas);

      setAllPrices((preSum) => preSum + sum);
      setProducts((prevProducts) => [...prevProducts, ...datas]);

      setIsEnded(isEnd);
      setIsLoaded(true);
    }

    if (!isEnded) {
      fetchProducts(pageNumber);
    }
  }, [pageNumber, isEnded]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);

    if (!isEnded) {
      setPageNumber((prevNumber) => prevNumber + 1);
    }
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-12 h-full min-h-screen bg-slate-200">
      <div className="flex flex-row self-center justify-between">
        <h1 className="mb-6 text-2xl font-bold">전체 상품</h1>
        <p className="text-xl font-base font-semibold text-blue-600">$ {allPrices}</p>
      </div>
      {products && products.map((product) => <Card product={product} key={product.productId} />)}
      <div ref={ref} className="loading-indicator">
        {!isEnded ? "Loading more..." : "No more products"}
      </div>
    </div>
  );
}

export default App;
