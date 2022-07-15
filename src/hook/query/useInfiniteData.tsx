import axios from "axios";
import { useInfiniteQuery } from "react-query";

export const useInfiniteData = () => {
  // useInfiniteQuery에서 쓸 함수
  const fetchList = async ({ pageParam = 1 }) => {
    const response = await axios.get(
      `https://swapi.dev/api/people/${pageParam}`
    );

    let isLast = !(pageParam < 82);

    return {
      result: response.data,
      nextPage: pageParam + 1,
      isLast,
    };
  };

  const query = useInfiniteQuery("infinite", fetchList, {
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.isLast) return lastPage.nextPage;
      return undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1,
  });

  return query;
};
