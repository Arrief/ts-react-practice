import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store";
import Details from "./Details";
import SearchParams from "./SearchParams";

// possible to have multiple queryClients in one app, rarely needed
const queryClient = new QueryClient({
  // config
  defaultOptions: {
    queries: {
      // how long to cache things w/o updating data, here for entire session, otherwise duration in milliseconds
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      {/* Provides context for the entire app, like BrowserRouter = "higher order/wrapping component" */}
      <QueryClientProvider client={queryClient}>
        {/* Redux store instead of Context */}
        <Provider store={store}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/" element={<SearchParams />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

export default App;
