//* OLD WAY with manually re-creating a React component; now much easier with less code thanks to testing-library's renderHook
import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../useBreedList";

const queryClient = new QueryClient({
  queries: {
    staleTime: Infinity,
    cacheTime: Infinity,
    // React Query retries 3x by default, for testing one fail is enough, no retry needed
    retry: false,
  },
});

function getBreedList(animal) {
  let list;

  // React hooks only work inside a React component => we need to fake one here, also reason for .jsx file extension of the test while useBreedList is a .js file
  function TestComponent() {
    list = useBreedList(animal);
    return null;
  }

  render(
    <QueryClientProvider client={queryClient}>
      <TestComponent />
    </QueryClientProvider>
  );

  return list;
}

test("Gives an empty list with no animal provided", async () => {
  const [breedList, status] = getBreedList();
  expect(breedList).toHaveLength(0);
  expect(status).toBe("loading");
});
