import { Link } from "react-router-dom";
import { Animal } from "../types/APIResponsesTypes";
import { FunctionComponent } from "react";

// Could also just set to Pet, but includes types we don't need here
interface IProps {
  name: string;
  animal: Animal;
  breed: string;
  images: string[];
  location: string;
  id: number;
}

// typing Pet to FC<IProps> is not strictly necessary and in fact even discouraged by Facebook's React Team
const Pet: FunctionComponent<IProps> = (props: IProps) => {
  const { name, animal, breed, images, location, id } = props;

  // default image
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) hero = images[0];

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
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
