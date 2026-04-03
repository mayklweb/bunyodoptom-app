import { useQuery } from "@tanstack/react-query";
import { fetchMarketsApi } from "../api/marketApi";

export const useMarkets = () => {
  return useQuery(["markets"], fetchMarketsApi);
};
