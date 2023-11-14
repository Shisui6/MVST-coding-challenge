// Importing Outlet from react-router-dom. Outlet is a component that renders the matching child route.
import { Outlet } from 'react-router-dom';

// Defining a functional component named App
const App = () => {

  // The component returns a div with an id of "detail"
  // Inside this div, the Outlet component is used.
  // The Outlet component will render the component of the matched route.
  return (
    <div id="detail">
      <Outlet />
    </div>
  )
}

// Exporting the App component as the default export of this module
export default App;