import { useQuery } from "@tanstack/react-query";
import { fetchAddressesApi } from "../api/addressApi";

export const useAddresses = () =>
  useQuery(["addresses"], fetchAddressesApi);