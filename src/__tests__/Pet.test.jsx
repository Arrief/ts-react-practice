import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import Pet from "../Pet";

test("Displays a default thumbnail", async () => {
  // First render the component we want to test; wrap in StaticRouter for a Node environment because the test doesn't have access to BrowserRouter from App.jsx which is needed in Pet.jsx
  const pet = render(
    <StaticRouter>
      <Pet />
    </StaticRouter>
  );

  // JSX element has data-testid="thumbnail"
  const petThumbnail = await pet.findByTestId("thumbnail");
  // If otherwise we give no image, none.jpg is supposed to show up
  expect(petThumbnail.src).toContain("none.jpg");

  // Final cleanup after test, only necessary with Vitest, not with Jest
  pet.unmount();
});

test("Displays a non-default thumbnail", async () => {
  const pet = render(
    <StaticRouter>
      <Pet images={["1.jpg", "2.jpg", "3.jpg"]} />
    </StaticRouter>
  );

  const petThumbnail = await pet.findByTestId("thumbnail");
  expect(petThumbnail.src).toContain("1.jpg");

  pet.unmount();
});
