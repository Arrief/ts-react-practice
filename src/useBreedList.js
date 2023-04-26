import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

//* ReactQuery function
export default function useBreedList(animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);

  // return data or empty array
  return [results?.data?.breeds ?? [], results.status];
}
