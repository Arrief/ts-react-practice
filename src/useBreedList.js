import { useState, useEffect } from "react";

const localCache = {};

//* Custom Hook, combining useState & useEffect
export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  // tracking status not needed directly here but very useful later for Testing!
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) setBreedList([]);
    else if (localCache[animal]) setBreedList(localCache[animal]);
    else requestBreedList();

    // this function could be outside of useEffect too, but React & ESLint encourage including it here inside
    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();

      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
