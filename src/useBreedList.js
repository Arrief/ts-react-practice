import { useGetBreedsQuery } from "./petApiService";

//* Redux Toolkit React Query function
export default function useBreedList(animal) {
  const { data: breeds, isLoading } = useGetBreedsQuery(animal, {
    // Don't make any request if we receive no animal
    skip: !animal,
  });

  if (!animal) {
    return [[], "loaded"];
  }

  // return data or empty array
  return [breeds ?? [], isLoading ? "loading" : "loaded"];
}
