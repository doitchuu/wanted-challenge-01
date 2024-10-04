import { useState, useEffect } from "react";

import Card from "./components/Card";

import useIntersect from "./hooks/useIntersect";
import calculateAllPrices from "./utils/calculateAllPrices";
import getMockData from "./utils/getMockData";
import { IProduct } from "./types/MockData";
import Skeleton from "./components/Skeleton";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [allPrices, setAllPrices] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProducts(page: number) {
      setIsFetching(true);

      const { datas, isEnd } = await getMockData(page);
      const sum = calculateAllPrices(datas);

      setAllPrices((preSum) => preSum + sum);
      setProducts((prevProducts) => [...prevProducts, ...datas]);

      setIsEnded(isEnd);
      setIsLoaded(true);

      setIsFetching(false);
    }

    if (!isEnded) {
      fetchProducts(pageNumber);
    }
  }, [pageNumber, isEnded]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);

    if (!isEnded && !isFetching) {
      setPageNumber((prevNumber) => prevNumber + 1);
    }
  });

  return (
    <div className="p-12 h-full min-h-screen bg-slate-200">
      <div className="flex flex-row self-center justify-between">
        <h1 className="mb-6 text-2xl font-bold">전체 상품</h1>
        <p className="text-xl font-base font-semibold text-blue-600">$ {allPrices}</p>
      </div>
      {!isLoaded
        ? Array(6)
            .fill(0)
            .map((_, index) => <Skeleton key={index} />)
        : products.map((product) => <Card product={product} key={product.productId} />)}
      <div ref={ref} className="loading-indicator">
        {isFetching && <Skeleton />}
        {!isEnded ? "Loading more..." : "No more products"}
      </div>
    </div>
  );
}

export default App;
