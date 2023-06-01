import { Component } from "react";

class Carousel extends Component {
  /* constructor now optional with class properties:
  constructor() {
    super();
    this.state = { active: 0 };
  }
  */

  // state not directly mutable, only with this.setState() method
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  // arrow function is best solution here to ensure "this" is what we think it is and want it to be => no own scope for arrow fn, refers to Class
  handleIndexClick = (event) => {
    this.setState({
      // index is a number originally but comes as string from DOM -> convert again
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img data-testid="hero" src={images[active]} alt="animal hero" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              data-testid={`thumbnail${index}`}
              key={photo}
              src={photo}
              alt="animal thumbnail"
              className={index === active ? "active" : ""}
            />
          ))}
        </div>
      </div>
    );
  }
}

/* 
//* If we wanted to use a hook, here our old custom hook, inside a Class component, we get an error: hooks only work with functional components; workaround: create higher order functional component, use hook there and then feed result into Class:

function CarouselParent({ animal }) {
  const [breedList] = useBreedList(animal);

  return <Carousel breedList={breedList} />
}

export default CarouseParent;
*/

export default Carousel;
