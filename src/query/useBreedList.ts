import { QueryStatus, useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";
import { Animal } from "../types/APIResponsesTypes";

//* ReactQuery function
export default function useBreedList(animal: Animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);

  // return data or empty array
  return [results?.data?.breeds ?? [], results.status] as [
    string[],
    QueryStatus
  ];
}
