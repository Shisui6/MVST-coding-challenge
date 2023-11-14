// Import necessary libraries and components
import { render } from "@testing-library/react";
import Home from "../components/Home/Home";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../redux/configureStore";
import { BrowserRouter as Router } from "react-router-dom";
import { setError } from "../redux/user/user";

// Start of test suite for the Home component
describe("Home component", () => {

  // Test that the Home component renders without crashing
  it("renders without crashing", () => {
    // Render the Home component inside a Redux Provider and Router
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );
    // Expect that the text 'Discover GitHub Repositories' is present in the document
    expect(getByText(/Discover GitHub Repositories/i)).toBeInTheDocument();
  });

  // Test that the Home component displays an error message when the error state is true
  it("displays error message when error state is true", () => {
    // Dispatch the setError action to set the error state to true
    store.dispatch(setError(true))
    // Render the Home component inside a Redux Provider and Router
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );
    // Expect that the error message 'Please check the spelling and try again' is present in the document
    expect(getByText(/Please check the spelling and try again/i)).toBeInTheDocument();
  });
});