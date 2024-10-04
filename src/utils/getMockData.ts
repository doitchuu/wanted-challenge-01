import { IProduct } from "../types/MockData";
import NUMBER from "../constants/number";
import MOCK_DATA from "../mocks/mockData";

const { PER_PAGE, TIME_RANGE } = NUMBER;

function getMockData(pageNumber: number): Promise<{ datas: IProduct[]; isEnd: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const datas: IProduct[] = MOCK_DATA.slice(PER_PAGE * pageNumber, PER_PAGE * (pageNumber + 1));
      const isEnd = PER_PAGE * (pageNumber + 1) >= MOCK_DATA.length;

      resolve({ datas, isEnd });
    }, TIME_RANGE);
  });
}

export default getMockData;
