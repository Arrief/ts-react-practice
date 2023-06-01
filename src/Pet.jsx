import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  // default image
  let hero = "https://pets-images.dev-apis.com/pets/none.jpg";
  // Checking if there even IS an array of images, even an empty one, thanks to Pet.test.jsx feedback
  if (images && images.length) hero = images[0];

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img data-testid="thumbnail" src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
