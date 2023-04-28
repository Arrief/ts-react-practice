import { createContext } from "react";
import { Pet } from "../types/APIResponsesTypes";

/* Give createContext a starting value to silence TS, also good for testing.
 Alternative: 
 const AdoptedPetContext = createContext<[Pet, (adoptedPet: Pet)] => void] | null>(null);
*/
const AdoptedPetContext = createContext<
  [Pet | null, (adoptedPet: Pet) => void]
>([
  {
    id: 1337,
    name: "Pikachu",
    animal: "rabbit",
    description: "Pika pika!",
    breed: "Electric",
    images: [],
    city: "Pallet Town",
    state: "Kanto",
  },
  () => {},
]);

export default AdoptedPetContext;
