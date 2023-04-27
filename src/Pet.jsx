import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  // default image
  let hero = "https://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) hero = images[0];

  return (
    <Link to={`/details/${id}`} className="relative block">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="bg-gradient-tr from-white-to-transparent absolute bottom-0 left-0 pr-2 pt-2">
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
