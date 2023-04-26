//* ReactQuery function
const fetchPet = async ({ queryKey }) => {
  // queryKey = array, 2nd element = id
  const id = queryKey[1];

  const apiRes = await fetch(`https://pets-v2.dev-apis.com/pets?id=${id}`);

  // React Query expects us to throw Error if fetch was unsuccessful, can be caught by ReQu
  if (!apiRes.ok) throw new Error(`details/${id} fetch failed`);

  // ReQu also expects us to return a Promise - which async functions always do anyway! Does not even need an "await" here, would just waste one tick unnecessarily
  return apiRes.json();
};

export default fetchPet;
