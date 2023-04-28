import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "../context/AdoptedPetContext";
import ErrorBoundary from "../components/ErrorBoundary";
import Carousel from "../components/Carousel";
import fetchPet from "../query/fetchPet";
import Modal from "../components/Modal";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  const { id } = useParams();
  if (!id) {
    throw new Error(
      "Why did you not give me an id?! I wanted an id! I have no id!!!"
    );
  }

  // give useQuery caching string & a key of what we request & a function to call in case the key is not stored in the cache yet
  const results = useQuery(["details", id], fetchPet);

  // isLoading & isError properties come from ReactQuery
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🐶</h2>
      </div>
    );
  }

  if (results.isError) {
    return <h2>Oh no, something went wrong 😿</h2>;
  }

  const pet = results?.data?.pets[0];
  if (!pet) throw new Error("No pet... 😿");

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {/* Modal can be anywhere, position doesn't matter; because of React virtual DOM, would be possible to put eventListener on div.details and listen for click bubbling up - despite the Modal being in a completely different place of the actual DOM in the end! */}
          {showModal && (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          )}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  /* Wrapping WHOLE Details component checks for error from ReactQuery too! Otherwise if we just wrapped the <div className="details"> from Details' return inside ErrorBoundary, only the JSX code would get evaluated

  Could even wrap entire App component into ErrorBoundary, like BrowserRouter, ContextProvider, etc.
   */
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
