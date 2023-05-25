import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import Results from "./Results";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";
import { all } from "./searchParamsSlice.js";

const ANIMALS = ["bird", "cat", "dog", "reptile", "rabbit"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("");
  // ReactQuery function
  const [breeds] = useBreedList(animal);
  /* //* Function to get data from Redux and also a "subscription" to Redux => if adoptedPet changes, Redux will register the change an rerender.

  //* Needs a function as arg to get specifically what we need for this component; otherwise, if we just get "state" from useSelector(), then this component will rerender whenever ANYTHING stored in Redux changes
  */
  const adoptedPet = useSelector((state) => state.adoptedPet.value);

  const searchParams = useSelector((state) => state.searchParams.value);

  // For useDispatch explanation, see Details.jsx
  const dispatch = useDispatch();

  const results = useQuery(["search", searchParams], fetchSearch);

  const pets = results?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          // Browser API Class, pulls out all data from a form as new object, given a form
          const formData = new FormData(e.target);

          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };

          dispatch(all(obj));
        }}
      >
        {/* Display the pet already adopted by user */}
        {adoptedPet && (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        )}

        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
