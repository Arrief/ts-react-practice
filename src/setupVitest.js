// This file will get run before all other tests get run
import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";

const fetchMock = createFetchMock(vi);
// Enable mocks for fetch-function globally for entire application:
fetchMock.enableMocks();
