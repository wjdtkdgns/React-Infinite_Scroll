import axios from "axios";
import { useInfiniteQuery } from "react-query";

export const useInfiniteData = () => {
  const fetchList = async ({ pageParam = 1 }) => {
    const response = await axios.get(
      `https://swapi.dev/api/people/${pageParam}`
    );

    let isLast = !(pageParam < 10);

    return {
      result: response.data,
      nextPage: pageParam + 1,
      isLast,
    };
  };

  const query = useInfiniteQuery<
    {
      result: any;
      nextPage: number;
      isLast: boolean;
    },
    unknown
  >("infinite", fetchList, {
    getNextPageParam: (lastPage) => {
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
