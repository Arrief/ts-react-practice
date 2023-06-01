import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Carousel from "../Carousel";

test("Lets users click on thumbnails to make the the hero image", async () => {
  const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
  // No StaticRouter necessary because no React Router related functionality in Carousel
  const carousel = render(<Carousel images={images} />);

  const hero = await carousel.findByTestId("hero");
  // Whatever the first picture from the array is, it should be the first default hero img
  expect(hero.src).toContain(images[0]);

  // Testing every image individually with a loop
  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    const thumb = await carousel.findByTestId(`thumbnail${i}`);
    // Simulating a user clicks the image in the browser
    await thumb.click();

    expect(hero.src).toContain(image);
    // Create an array from all classes of the JSX element and check if it has "active"
    expect(Array.from(thumb.classList)).toContain("active");
  }

  carousel.unmount();
});
